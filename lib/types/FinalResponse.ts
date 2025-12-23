export interface ItineraryDay {
  day: string;
  activities: string[];
}

export interface BiayaItem {
  kategori: string;
  rincian: string;
  estimasi_per_orang: string;
  total_rombongan: string;
}

export interface AdminInfo {
  visa: string;
  biayaVisa?: string;
  prosesVisa?: string;
  dokumen: string[];
  biayaDokumen?: {
    paspor?: string;
    asuransi?: string;
    simInternasional?: string;
  };
  tips: string[];
  kantorVisa?: string;
}

export interface FinalResponse {
  resp: string;
  itinerary: ItineraryDay[];
  estimasi: BiayaItem[];
  admin?: AdminInfo;
}
