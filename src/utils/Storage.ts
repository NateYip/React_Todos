interface todo {
    id: number;
    status: boolean;
    content: string;
}

function SetStorage (key:string, val:todo[]) {
    console.log("SetStorage")
    const curTime = new Date().getTime();
    localStorage.setItem(key, JSON.stringify({ 
        data: val, 
        time: curTime + 43200000//12 hours
    }))
}


function GetStorage (key:string) {
    console.log("GetStorage")
    const data:any = localStorage.getItem(key);
    const dataObj = JSON.parse(data);
    if(!dataObj){
        return [];
    }else if (new Date().getTime() - dataObj.time < 0 && dataObj) {
        return dataObj.data;
    } else {
        localStorage.removeItem(key)//Delete Storage
        return [];
    }
}

export {
    SetStorage,
    GetStorage,
}