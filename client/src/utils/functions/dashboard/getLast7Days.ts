
export const last7Days = () => {
    const last7Days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const day = date.toISOString().split('T')[0];
        last7Days.push(day);
    }
    return last7Days;
}
