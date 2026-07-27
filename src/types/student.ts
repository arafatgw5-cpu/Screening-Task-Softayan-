export type AttendanceStatus = "present" | "absent" | "leave";

export interface Student {
  id: number;
  name: string;
  avatar: string;
  class: string;
  section: string;
  roll: number;
  status: AttendanceStatus;
  lastUpdated: string;
}