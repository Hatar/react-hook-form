export const formatBody = (string) =>{
    if (string.length > 25) {
       return  string = string.substring(0, 40) + "...";
    }
}