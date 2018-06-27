import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

var baseurl = "https://api.iextrading.com/1.0";

let sym = ['AAPL','MSFT','IBN','V','HDB','PYPL','TSLA','FB','AXP','KO','BABA','VOD'];
let name = ['n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','n11','n12'];
let sector = ['sector1','sector2','sector3','sector4','sector5','sector6','sector7','sector8','sector9','sector10','sector11','sector12'];
let industry = ['industry1','industry2','industry3','industry4','industry5','industry6','industry7','industry8','industry9','industry10','industry11','industry12'];
let ceo = ['ceo1','ceo2','ceo3','ceo4','ceo5','ceo6','ceo7','ceo8','ceo9','ceo10','ceo11','ceo12'];
let website = ['website1','website2','website3','website4','website5','website6','website7','website8','website9','website10','website11','website12'];
let des = ['des1','des2','des3','des4','des5','des6','des7','des8','des9','des10','des11','des12'];
let price = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12'];
let size = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12'];
let tradeid = ['t1','t2','t3','t4','t5','t6','t7','t8','t9','t10','t11','t12'];
let time = ['h1','h2','h3','h4','h5','h6','h7','h8','h9','h10','h11','h12'];
let image = ['m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11','m12'];

let com: any = [];
let st: any = [];
let logo: any = [];
let interval: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private http: Http) { }

    /* Companies Symbols -  AAPL,MSFT,IBN,V,HDB,PYPL,TSLA,FB,AXP,KO,BABA,VOD */
    
  ngOnInit() {
    
      this.getData();

      setTimeout(this.updateData, 3000);
      interval = setInterval(() => { 
        this.getData(); 
        (document.getElementById("main") as HTMLDivElement).style.display = "none";
      (document.getElementById("loader") as HTMLDivElement).style.display = "block";
        setTimeout(this.updateData, 3000);
    }, 120000);
  }

  updateData(){
    (document.getElementById("main") as HTMLDivElement).style.display = "grid";
      (document.getElementById("loader") as HTMLDivElement).style.display = "none";
  }

  getData(){

    for(let i = 0 ; i< sym.length; i++)
    {
      let url:string = "https://api.iextrading.com/1.0/stock/" + sym[i] + "/company";
      //console.log(url);

      this.callGetApi(url, (response) => {
      console.log('res callback for Details of ' + sym[i], response); 
      com[i] = response;
      this.comp(com[i],name[i],sector[i],industry[i],ceo[i],website[i],des[i]);
      });
    }
    for(let i = 0 ; i< sym.length; i++)
    {
      let url:string = "https://api.iextrading.com/1.0/deep/trades?symbols=" + sym[i];
      console.log(url);

      this.callGetApi(url, (response) => {
      console.log('res callback for Stock of '+ sym[i], response); 
      st[i] = response;
      this.stock(st[i],price[i],size[i],tradeid[i],time[i],i);
      });
    }
    for(let i = 0 ; i< sym.length; i++)
    {
      let url:string = "https://api.iextrading.com/1.0/stock/" + sym[i] + "/logo";
      //console.log(url);

      this.callGetApi(url, (response) => {
      console.log('res callback for LOGO of ' + sym[i], response); 
      logo[i] = response;
      this.logo(logo[i],image[i]);
      });
    }
  }

  comp(l,n,sec,ind,ceo,web,des){
    //console.log(l.companyName);
    document.getElementById(n).innerHTML = l.companyName +" (" + l.symbol + ")";
    document.getElementById(sec).innerHTML = "SECTOR : " + l.sector;
    document.getElementById(ind).innerHTML = "INDUSTRY : " + l.industry;
    document.getElementById(ceo).innerHTML = "CEO : " + l.CEO;
    document.getElementById(web).innerHTML = l.website ;
    (document.getElementById(web) as HTMLLinkElement).href =l.website;
    document.getElementById(des).innerHTML = "DESCRIPTION : " + l.description;
  }

  stock(p,pr,sz,tid,h,i){
    let t1: any;
    if(i == 0){ document.getElementById(pr).innerHTML = p.AAPL["0"].price; document.getElementById(sz).innerHTML = p.AAPL["0"].size; 
    document.getElementById(tid).innerHTML = p.AAPL["0"].tradeId; t1 = p.AAPL["0"].timestamp; }
    else if( i== 1){ document.getElementById(pr).innerHTML = p.MSFT["0"].price; document.getElementById(sz).innerHTML = p.MSFT["0"].size; 
    document.getElementById(tid).innerHTML = p.MSFT["0"].tradeId; t1 = p.MSFT["0"].timestamp; }
    else if( i== 2){ document.getElementById(pr).innerHTML = p.IBN["0"].price; document.getElementById(sz).innerHTML = p.IBN["0"].size; 
    document.getElementById(tid).innerHTML = p.IBN["0"].tradeId; t1 = p.IBN["0"].timestamp; }
    else if( i== 3){ document.getElementById(pr).innerHTML = p.V["0"].price; document.getElementById(sz).innerHTML = p.V["0"].size; 
    document.getElementById(tid).innerHTML = p.V["0"].tradeId; t1 = p.V["0"].timestamp; }
    else if( i== 4){ document.getElementById(pr).innerHTML = p.HDB["0"].price; document.getElementById(sz).innerHTML = p.HDB["0"].size; 
    document.getElementById(tid).innerHTML = p.HDB["0"].tradeId; t1 = p.HDB["0"].timestamp; }
    else if( i== 5){ document.getElementById(pr).innerHTML = p.PYPL["0"].price; document.getElementById(sz).innerHTML = p.PYPL["0"].size; 
    document.getElementById(tid).innerHTML = p.PYPL["0"].tradeId; t1 = p.PYPL["0"].timestamp; }
    else if( i== 6){ document.getElementById(pr).innerHTML = p.TSLA["0"].price; document.getElementById(sz).innerHTML = p.TSLA["0"].size; 
    document.getElementById(tid).innerHTML = p.TSLA["0"].tradeId; t1 = p.TSLA["0"].timestamp; }
    else if( i== 7){ document.getElementById(pr).innerHTML = p.FB["0"].price; document.getElementById(sz).innerHTML = p.FB["0"].size; 
    document.getElementById(tid).innerHTML = p.FB["0"].tradeId; t1 = p.FB["0"].timestamp; }
    else if( i== 8){ document.getElementById(pr).innerHTML = p.AXP["0"].price; document.getElementById(sz).innerHTML = p.AXP["0"].size; 
    document.getElementById(tid).innerHTML = p.AXP["0"].tradeId; t1 = p.AXP["0"].timestamp; }
    else if( i== 9){ document.getElementById(pr).innerHTML = p.KO["0"].price; document.getElementById(sz).innerHTML = p.KO["0"].size; 
    document.getElementById(tid).innerHTML = p.KO["0"].tradeId; t1 = p.KO["0"].timestamp; }
    else if( i== 10){ document.getElementById(pr).innerHTML = p.BABA["0"].price; document.getElementById(sz).innerHTML = p.BABA["0"].size; 
    document.getElementById(tid).innerHTML = p.BABA["0"].tradeId; t1 = p.BABA["0"].timestamp; }
    else if( i== 11){ document.getElementById(pr).innerHTML = p.VOD["0"].price; document.getElementById(sz).innerHTML = p.VOD["0"].size; 
    document.getElementById(tid).innerHTML = p.VOD["0"].tradeId; t1 = p.VOD["0"].timestamp; }

    /*document.getElementById(pr).innerHTML = p.sym[i]["0"].price;
    document.getElementById(sz).innerHTML = p.sym[i]["0"].size;
    document.getElementById(tid).innerHTML = p.sym[i]["0"].tradeId;
    let t1 = p.sym[i]["0"].timestamp;*/
    //console.log(t1);
    var dateTime = new Date(t1);
    dateTime.toISOString();
    //console.log(dateTime.toLocaleString());
    document.getElementById(h).innerHTML = dateTime.toLocaleString();
  }
 
  logo(l,id){
   console.log(l.url);
    //(document.getElementById(id) as HTMLImageElement).src = l.url;
  }

  callGetApi(apiurl: string, callback) {
    const headers = new Headers();
    //headers.append('content-type', 'application/json');
    const options = new RequestOptions({
      headers: headers,
      method: 'GET'
    });
    return this.http.get(apiurl, options).toPromise().then((res) => { /*console.log(res);*/ callback(res.json()); });
  }
}
