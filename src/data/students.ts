import { Student } from "@/types/student";

/**
 * Extended mock data — 34 students across multiple classes/sections
 * to support functional pagination (5 per page = 7 pages).
 */
export const mockStudents: Student[] = [
  // ── Page 1 (matches the screenshot exactly) ──
  { id: 1, name: "Ayesha Khan", avatar: "https://i.pravatar.cc/150?u=ayesha", class: "10-A", section: "A", roll: 101, status: "present", lastUpdated: "2 mins ago" },
  { id: 2, name: "Rohan Das", avatar: "https://i.pravatar.cc/150?u=rohan", class: "10-A", section: "A", roll: 102, status: "present", lastUpdated: "5 mins ago" },
  { id: 3, name: "Fatima Zahra", avatar: "https://i.pravatar.cc/150?u=fatima", class: "10-A", section: "A", roll: 103, status: "absent", lastUpdated: "8 mins ago" },
  { id: 4, name: "Kabir Singh", avatar: "https://i.pravatar.cc/150?u=kabir", class: "10-A", section: "A", roll: 104, status: "leave", lastUpdated: "10 mins ago" },
  { id: 5, name: "Rohan Das", avatar: "https://i.pravatar.cc/150?u=rohan2", class: "10-A", section: "A", roll: 105, status: "leave", lastUpdated: "12 mins ago" },

  // ── Page 2 ──
  { id: 6, name: "Priya Sharma", avatar: "https://i.pravatar.cc/150?u=priya", class: "10-A", section: "A", roll: 106, status: "present", lastUpdated: "15 mins ago" },
  { id: 7, name: "Arjun Patel", avatar: "https://i.pravatar.cc/150?u=arjun", class: "10-A", section: "A", roll: 107, status: "present", lastUpdated: "18 mins ago" },
  { id: 8, name: "Sneha Reddy", avatar: "https://i.pravatar.cc/150?u=sneha", class: "10-A", section: "B", roll: 108, status: "absent", lastUpdated: "22 mins ago" },
  { id: 9, name: "Vikram Joshi", avatar: "https://i.pravatar.cc/150?u=vikram", class: "10-A", section: "B", roll: 109, status: "present", lastUpdated: "30 mins ago" },
  { id: 10, name: "Meera Nair", avatar: "https://i.pravatar.cc/150?u=meera", class: "10-A", section: "B", roll: 110, status: "present", lastUpdated: "35 mins ago" },

  // ── Page 3 ──
  { id: 11, name: "Amit Kumar", avatar: "https://i.pravatar.cc/150?u=amit", class: "10-B", section: "A", roll: 201, status: "present", lastUpdated: "40 mins ago" },
  { id: 12, name: "Zara Ahmed", avatar: "https://i.pravatar.cc/150?u=zara", class: "10-B", section: "A", roll: 202, status: "absent", lastUpdated: "45 mins ago" },
  { id: 13, name: "Rahul Verma", avatar: "https://i.pravatar.cc/150?u=rahul", class: "10-B", section: "A", roll: 203, status: "present", lastUpdated: "50 mins ago" },
  { id: 14, name: "Ananya Gupta", avatar: "https://i.pravatar.cc/150?u=ananya", class: "10-B", section: "B", roll: 204, status: "leave", lastUpdated: "1 hour ago" },
  { id: 15, name: "Siddharth Rao", avatar: "https://i.pravatar.cc/150?u=siddharth", class: "10-B", section: "B", roll: 205, status: "present", lastUpdated: "1 hour ago" },

  // ── Page 4 ──
  { id: 16, name: "Nisha Iyer", avatar: "https://i.pravatar.cc/150?u=nisha", class: "11-A", section: "A", roll: 301, status: "present", lastUpdated: "2 hours ago" },
  { id: 17, name: "Omar Sheikh", avatar: "https://i.pravatar.cc/150?u=omar", class: "11-A", section: "A", roll: 302, status: "absent", lastUpdated: "2 hours ago" },
  { id: 18, name: "Deepa Menon", avatar: "https://i.pravatar.cc/150?u=deepa", class: "11-A", section: "A", roll: 303, status: "present", lastUpdated: "3 hours ago" },
  { id: 19, name: "Karan Malhotra", avatar: "https://i.pravatar.cc/150?u=karan", class: "11-A", section: "B", roll: 304, status: "present", lastUpdated: "3 hours ago" },
  { id: 20, name: "Pooja Desai", avatar: "https://i.pravatar.cc/150?u=pooja", class: "11-A", section: "B", roll: 305, status: "leave", lastUpdated: "4 hours ago" },

  // ── Page 5 ──
  { id: 21, name: "Tanvi Bhatt", avatar: "https://i.pravatar.cc/150?u=tanvi", class: "9-A", section: "A", roll: 401, status: "present", lastUpdated: "5 hours ago" },
  { id: 22, name: "Ravi Shankar", avatar: "https://i.pravatar.cc/150?u=ravi", class: "9-A", section: "A", roll: 402, status: "present", lastUpdated: "6 hours ago" },
  { id: 23, name: "Ishaan Mehta", avatar: "https://i.pravatar.cc/150?u=ishaan", class: "9-A", section: "A", roll: 403, status: "absent", lastUpdated: "6 hours ago" },
  { id: 24, name: "Kavya Pillai", avatar: "https://i.pravatar.cc/150?u=kavya", class: "9-A", section: "B", roll: 404, status: "present", lastUpdated: "8 hours ago" },
  { id: 25, name: "Manish Tiwari", avatar: "https://i.pravatar.cc/150?u=manish", class: "9-A", section: "B", roll: 405, status: "leave", lastUpdated: "10 hours ago" },

  // ── Page 6 ──
  { id: 26, name: "Divya Saxena", avatar: "https://i.pravatar.cc/150?u=divya", class: "9-B", section: "A", roll: 501, status: "present", lastUpdated: "1 day ago" },
  { id: 27, name: "Suresh Babu", avatar: "https://i.pravatar.cc/150?u=suresh", class: "9-B", section: "A", roll: 502, status: "present", lastUpdated: "1 day ago" },
  { id: 28, name: "Lata Mangeshkar", avatar: "https://i.pravatar.cc/150?u=lata", class: "9-B", section: "B", roll: 503, status: "absent", lastUpdated: "1 day ago" },
  { id: 29, name: "Arun Prakash", avatar: "https://i.pravatar.cc/150?u=arun", class: "9-B", section: "B", roll: 504, status: "present", lastUpdated: "2 days ago" },
  { id: 30, name: "Simran Kaur", avatar: "https://i.pravatar.cc/150?u=simran", class: "9-B", section: "B", roll: 505, status: "leave", lastUpdated: "2 days ago" },

  // ── Page 7 (partial) ──
  { id: 31, name: "Varun Dhawan", avatar: "https://i.pravatar.cc/150?u=varun", class: "10-A", section: "A", roll: 111, status: "present", lastUpdated: "3 days ago" },
  { id: 32, name: "Rina Banerjee", avatar: "https://i.pravatar.cc/150?u=rina", class: "10-A", section: "B", roll: 112, status: "present", lastUpdated: "3 days ago" },
  { id: 33, name: "Nikhil Chopra", avatar: "https://i.pravatar.cc/150?u=nikhil", class: "10-B", section: "A", roll: 206, status: "absent", lastUpdated: "4 days ago" },
  { id: 34, name: "Sara Ali", avatar: "https://i.pravatar.cc/150?u=sara", class: "10-B", section: "B", roll: 207, status: "present", lastUpdated: "1 week ago" },
];