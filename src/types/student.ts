export type AttendanceStatus = "present" | "absent" | "leave";

export interface Student {
  id: number;
  name: string;
  class: string;
  section: string;
  roll: number;
  status: AttendanceStatus;
}