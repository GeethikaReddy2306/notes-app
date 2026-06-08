export default function utils() {
  return Date.toLocalDateString("enc-Us",{
month:"sort",
day:"numeric",
year:"numeric"
  });
}
   