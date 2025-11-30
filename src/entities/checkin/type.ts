// 1. Type trả về từ Backend (Mapping với Golang Struct)
export type DailyCheckinResponse = {
  id: string; // UUID
  userId: number;
  date: string; // Go trả về time.Time dưới dạng chuỗi ISO (VD: "2023-11-29T00:00:00Z")
  isMiss: boolean;
  isChecked: boolean;
};

// 2. Type dùng cho UI Component (CheckinBlock)
// Ta cần map "date" từ backend sang "Mon/Tue/..."
export type DailyCheckinType = {
  id: string; // Có thể dùng "Mon", "Tue" làm ID cho UI, hoặc UUID nếu muốn
  label: string; // "Mon", "Tue", "Wed"... để hiển thị
  fullDate: string; // "2023-11-29" để so sánh logic
  isChecked: boolean;
  isMiss: boolean;
  isToday?: boolean; // (Optional) Để highlight ngày hôm nay
};
