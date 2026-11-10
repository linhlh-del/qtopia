/* Toạ độ / link bản đồ dự án — file nhỏ, dùng được trong bundle chính (JSON-LD ApartmentComplex.geo).
   Toạ độ theo điểm "Dự án Q Topia Phước Hải" trên Google Maps — xác nhận lại với CĐT. */
export const PROJECT_GEO = { lat: 10.4043125, lng: 107.2758125 }
export const mapEmbedUrl = `https://maps.google.com/maps?q=${PROJECT_GEO.lat},${PROJECT_GEO.lng}&z=14&hl=vi&output=embed`
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${PROJECT_GEO.lat},${PROJECT_GEO.lng}`
