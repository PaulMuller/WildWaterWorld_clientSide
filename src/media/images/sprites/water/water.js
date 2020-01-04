const images = [];

for (let i=1; i <=250; i++ ){
    images.push(require("./water_058_c_"+String(i).padStart(4, '0')+".jpg"));
}
export default images;