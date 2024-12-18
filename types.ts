/** @format */

export interface AuthUser {
  [key: string]: any; // Allow any key of type string
  balance: string | number; // Untuk menyimpan saldo dengan tipe string
  created_at: string; // Tanggal pembuatan, bisa menggunakan string atau Date
  id: number; // ID pengguna
  periodno: string; // Nomor periode, tipe string
  statusgame: number; // Status game, tipe number
  updated_at: string; // Tanggal update, bisa menggunakan string atau Date
  username: string; // Nama pengguna
}

export interface MainAppWs {
  dataWs?: {
    countDown?: string | number | undefined;
    is_countdown?: boolean | undefined;
    message?: string | undefined;
    periodno?: string | undefined;
    result?: string | undefined;
    state_anim?: number | undefined;
    status?: string | undefined;
    statusBet?: string | undefined;
    timeCD?: string | undefined;
  };
}

export interface RootState {
  authUser: AuthUser; // Memasukkan AuthUser ke dalam RootState
  isPreload: boolean; // Status preload
}

export interface MainAppProps {
  authUser: AuthUser; // Tipe untuk `authUser`
  dataWs?: MainAppWs["dataWs"]; // Tambahkan dataWs opsional
}

export interface EventData {
  countDown: number | string; // Number of
  is_countdown: boolean;
  message: string;
  periodno: string; // Assuming periodno is a string (e.g., "P2411001646")
  result: string;
  status: string;
  statusBet: string;
  timeCD: string;
}

// Define the shape of the event object
export interface Event {
  data: EventData;
}
// Define the interface for the data structure
export interface EventBalance {
  data: {
    balance: string; // Assuming balance is a string (e.g., "633200.00")
    message: string; // Message describing the result (e.g., "Data successfully fetched")
    status: string; // Status of the operation (e.g., "Success")
    username: string; // Username of the user (e.g., "wantos")
  };
}

export interface RegisterInputProps {
  register: (data: {
    username: string;
    password: string;
    referral: string;
    hp: string;
    bank: string;
    norek: string;
    namarek: string;
  }) => void;
}

export interface MainAppProps {
  authUser: AuthUser; // Replace `AuthUser` with the correct type
}
// Example interface for the complete response structure
