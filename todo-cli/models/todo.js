displayableString() {
  const checkbox = this.completed ? "[x]" : "[ ]";
  const today = new Date().toISOString().split("T")[0];
  const isToday = this.dueDate === today;
  const dateStr = isToday ? "" : ` ${this.dueDate}`;
  return `${this.id}. ${checkbox} ${this.title.trim()}${dateStr}`;
}
