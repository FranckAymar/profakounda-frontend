import { URL } from 'src/app/API_url/config';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-cours-commun',
  templateUrl: './card-cours-commun.component.html',
  styleUrls: ['./card-cours-commun.component.css']
})
export class CardCoursCommunComponent implements OnInit {


  urlServer = URL.getAffichePubCoursCommun;

 
  @Input() cours;

  constructor() { }

  ngOnInit() {      
   
  }

  chargerTwitter(){
    alert("super")
    var url="https://profAkounda.com/courscommun/details/"+this.cours.coursCommun.id;
    var siteUrl="https://twitter.com/intent/tweet?text=Hello ! voici%20mon%20cours%20commun  " +encodeURIComponent(url);
    
    window.open(siteUrl,"partage");
  }

  chargerFace(){
    alert("super")
    var url="https://profAkounda.com/courscommun/details/"+this.cours.coursCommun.id;
    var siteUrl="https://www.facebook.com/sharer/sharer.php?u=" +encodeURIComponent(url);
    
    window.open(siteUrl,"partage");
  }

  chargerLink(){ 
    alert("super")
    var url="https://profAkounda.com/courscommun/details/"+this.cours.coursCommun.id;
    var siteUrl="https://www.linkedin.com/shareArticle?url=" +encodeURIComponent(url);
    
    window.open(siteUrl,"partage");
  }

  chargerInsta(){
    alert("super")
    var url="https://profAkounda.com/courscommun/details/"+this.cours.coursCommun.id;
    var siteUrl="https://www.whatsapp.com/faq/en/general";
    
    window.open(siteUrl,"partage");
  }
}
