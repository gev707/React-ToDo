export default function dateFormat(date) {
    return date.toISOString().slice(0,10);
}