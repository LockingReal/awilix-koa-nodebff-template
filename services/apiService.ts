import { IApi } from "../interface/IApi";
import { IData } from "../interface/IData";

class ApiService implements IApi{
    getInfo() {
        return new Promise<IData>((reslove)=>{
            reslove({
                data:'后台数据',
                result:[1,'next']
            });
        })
    }
}

export default ApiService;