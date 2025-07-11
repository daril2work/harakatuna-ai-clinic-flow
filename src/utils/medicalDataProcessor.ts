
export interface ClinicalData {
  vitals: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    oxygenSaturation?: number;
    respiratoryRate?: number;
  };
  labs: {
    name: string;
    value: string;
    unit?: string;
    reference?: string;
    abnormal?: boolean;
  }[];
  symptoms: string[];
  demographics: {
    age?: number;
    gender?: string;
    weight?: number;
    height?: number;
  };
  medications: string[];
  allergies: string[];
  chiefComplaint: string;
}

export interface MedicalScore {
  name: string;
  value: number;
  interpretation: string;
  severity: 'low' | 'moderate' | 'high';
}

export class MedicalDataProcessor {
  static extractStructuredData(clinicalText: string): ClinicalData {
    const data: ClinicalData = {
      vitals: {},
      labs: [],
      symptoms: [],
      demographics: {},
      medications: [],
      allergies: [],
      chiefComplaint: ''
    };

    // Extract vitals using regex patterns
    const bpMatch = clinicalText.match(/BP:?\s*(\d+\/\d+)/i);
    if (bpMatch) data.vitals.bloodPressure = bpMatch[1];

    const hrMatch = clinicalText.match(/HR:?\s*(\d+)/i);
    if (hrMatch) data.vitals.heartRate = parseInt(hrMatch[1]);

    const tempMatch = clinicalText.match(/temp:?\s*(\d+\.?\d*)/i);
    if (tempMatch) data.vitals.temperature = parseFloat(tempMatch[1]);

    const o2Match = clinicalText.match(/O2.*?(\d+)%/i);
    if (o2Match) data.vitals.oxygenSaturation = parseInt(o2Match[1]);

    // Extract lab values
    const labPatterns = [
      /troponin.*?(\d+\.?\d*)\s*(\w+)/i,
      /BNP.*?(\d+)\s*(\w+)/i,
      /hemoglobin.*?(\d+\.?\d*)\s*(\w+)/i,
      /glucose.*?(\d+)\s*(\w+)/i,
      /creatinine.*?(\d+\.?\d*)\s*(\w+)/i
    ];

    labPatterns.forEach(pattern => {
      const match = clinicalText.match(pattern);
      if (match) {
        data.labs.push({
          name: match[0].split(/\s/)[0],
          value: match[1],
          unit: match[2] || '',
          abnormal: this.isAbnormalLabValue(match[0].split(/\s/)[0], parseFloat(match[1]))
        });
      }
    });

    // Extract demographics
    const ageMatch = clinicalText.match(/(\d+)[-\s]?year[-\s]?old/i);
    if (ageMatch) data.demographics.age = parseInt(ageMatch[1]);

    const genderMatch = clinicalText.match(/(male|female|man|woman)/i);
    if (genderMatch) data.demographics.gender = genderMatch[1].toLowerCase();

    // Extract chief complaint
    const ccMatch = clinicalText.match(/chief complaint:?\s*([^\n]+)/i);
    if (ccMatch) data.chiefComplaint = ccMatch[1];

    return data;
  }

  static calculateMedicalScores(data: ClinicalData): MedicalScore[] {
    const scores: MedicalScore[] = [];

    // HEART Score for chest pain
    if (data.chiefComplaint.toLowerCase().includes('chest')) {
      const heartScore = this.calculateHeartScore(data);
      scores.push(heartScore);
    }

    // NEWS2 Score
    const news2Score = this.calculateNEWS2Score(data);
    scores.push(news2Score);

    // CHA2DS2-VASc for AFib patients
    if (data.symptoms.some(s => s.toLowerCase().includes('atrial fibrillation'))) {
      const chadScore = this.calculateCHA2DS2VASc(data);
      scores.push(chadScore);
    }

    return scores;
  }

  private static calculateHeartScore(data: ClinicalData): MedicalScore {
    let score = 0;
    let factors = [];

    // Age
    if (data.demographics.age && data.demographics.age >= 65) {
      score += 2;
      factors.push('Age ≥65');
    } else if (data.demographics.age && data.demographics.age >= 45) {
      score += 1;
      factors.push('Age 45-64');
    }

    // High-risk factors (simplified)
    const bpSystolic = data.vitals.bloodPressure ? 
      parseInt(data.vitals.bloodPressure.split('/')[0]) : 0;
    if (bpSystolic > 140) {
      score += 1;
      factors.push('Hypertension');
    }

    const interpretation = score <= 3 ? 'Low risk' : 
                          score <= 6 ? 'Moderate risk' : 'High risk';
    
    return {
      name: 'HEART Score',
      value: score,
      interpretation: `${interpretation} for major adverse cardiac events`,
      severity: score <= 3 ? 'low' : score <= 6 ? 'moderate' : 'high'
    };
  }

  private static calculateNEWS2Score(data: ClinicalData): MedicalScore {
    let score = 0;

    // Respiratory rate
    if (data.vitals.respiratoryRate) {
      const rr = data.vitals.respiratoryRate;
      if (rr <= 8 || rr >= 25) score += 3;
      else if (rr >= 21) score += 2;
      else if (rr >= 18) score += 1;
    }

    // Oxygen saturation
    if (data.vitals.oxygenSaturation) {
      const o2 = data.vitals.oxygenSaturation;
      if (o2 <= 91) score += 3;
      else if (o2 <= 93) score += 2;
      else if (o2 <= 95) score += 1;
    }

    // Heart rate
    if (data.vitals.heartRate) {
      const hr = data.vitals.heartRate;
      if (hr <= 40 || hr >= 131) score += 3;
      else if (hr >= 111) score += 2;
      else if (hr >= 91 || hr <= 50) score += 1;
    }

    const interpretation = score <= 4 ? 'Low clinical risk' :
                          score <= 6 ? 'Medium clinical risk' : 'High clinical risk';

    return {
      name: 'NEWS2 Score',
      value: score,
      interpretation,
      severity: score <= 4 ? 'low' : score <= 6 ? 'moderate' : 'high'
    };
  }

  private static calculateCHA2DS2VASc(data: ClinicalData): MedicalScore {
    let score = 0;

    if (data.demographics.age && data.demographics.age >= 75) score += 2;
    else if (data.demographics.age && data.demographics.age >= 65) score += 1;

    if (data.demographics.gender === 'female') score += 1;

    const interpretation = score === 0 ? 'Low stroke risk' :
                          score === 1 ? 'Low-moderate stroke risk' :
                          score <= 3 ? 'Moderate stroke risk' : 'High stroke risk';

    return {
      name: 'CHA₂DS₂-VASc',
      value: score,
      interpretation,
      severity: score <= 1 ? 'low' : score <= 3 ? 'moderate' : 'high'
    };
  }

  private static isAbnormalLabValue(labName: string, value: number): boolean {
    const normalRanges: { [key: string]: [number, number] } = {
      'troponin': [0, 0.04],
      'BNP': [0, 100],
      'hemoglobin': [12, 16],
      'glucose': [70, 100],
      'creatinine': [0.6, 1.3]
    };

    for (const [name, range] of Object.entries(normalRanges)) {
      if (labName.toLowerCase().includes(name.toLowerCase())) {
        return value < range[0] || value > range[1];
      }
    }
    return false;
  }
}
