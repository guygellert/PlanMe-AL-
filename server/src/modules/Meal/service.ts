export default class Service {
    checkIsIn = async (arr:any[],subarr:any[]) => {
        if(arr.length == 0){
            return false;
        }
        console.log(subarr.every(el => arr.includes(el)));
        return subarr.every(el => arr.includes(el));
    }
     getPossibleOptions = (arr:any[]) => {
        let result:any[][] = [[]]
            for(let i = 0 ; i < arr.length; i++){
                const current = arr[i];
                const length = result.length;
                for(let j =0 ; j < length; j++){
                    const temp = result[j].slice();
                    temp.push(current);
                    result.push(temp);
                } 
            }
            return result;
    }
    
}