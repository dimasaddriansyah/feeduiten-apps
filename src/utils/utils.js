export const rupiah = (number) => {
    return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}