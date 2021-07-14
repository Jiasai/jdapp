
//写入设置cookie
const setCookie=(name,value,{maxAge,domain,path,secure}={})=>{
	let cookeText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
	
	if(typeof maxAge ==='number'){
		cookeText += `; max-age=${maxAge}`;
	}
	if(domain){
		cookeText += `; domain=${domain}`;
	}
	if(path){
		cookeText += `; path=${domain}`;
	}
	if(secure){
		cookeText += `; secure`;
	}
	
	document.cookie = cookeText;
}

//编码,读取时使用 decodeURIComponent()解码

//通过name获取cookie的值
const getCookieValue=name=>{
	name = `${encodeURIComponent(name)}`;
	const theCookie=document.cookie.split('; ');
	const cookieArr=[];
	for (let valueitem of theCookie) {
		const [cookieName,cookieValue]=valueitem.split('=');
		if(cookieName === name){
			return decodeURIComponent(cookieValue);
		}else{
			return undefined;
		}
	}	
	return;	
}

//根据name、domain和path删除 cookie
const removeCookie=(name,{domain,path}={})=>{
	//可以直接调用设置方法
	setCookie(name,'',{domain,path,maxAge:-1});
}


export {setCookie,getCookieValue,removeCookie};
