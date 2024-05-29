import { LitElement, html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from './../UserAPI'
import Toast from './../Toast'

customElements.define('va-haircut', class Haircuts extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id:{
        type: String
      },
      name: {
        type: String
      },  
      description: {
        type: String
      },
      price: {
        type: String
      },
      user: {
        type: Object
      },
      image: {
        type: String
      },
      gender: {
        type: String
      },
      length: {
        type: String
      },
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

   async moreInfoHandler(){ // very important in adding the more information page in garage
    //new sl-dialog
    const dialogEl = document.createElement('sl-dialog')
    //add class name
    dialogEl.className = 'haircut-dialog'
    // sl dialog content
    const dialogContent = html`
        <style>
            .wrap {
                display: flex;
            }
            .image {
                width: 50%;
            }
            .image img {
                width: 100%;
            }
            .content {
                padding-left: 1em;
            }
            .gender span,
            .length span {
                text-transform: uppercase;
                font-weight: bold;
            }
            .price{
                font-size: 1.5em;
                color: var(--brand-color)
            }
        </style>
        <div class="wrap">
            <div class="image">
                <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
            </div>
            <div class="content">
                <h1>${this.name}</h1>
                <p>${this.description}</p>
                <p class="price">$${this.price}</p>
                <p class="gender">Gender: <span>${this.gender}</span></p>
                <p class="length">Length: <span>${this.length}</span></p>

                <sl-button @click=${this.addFavHandler.bind(this)}>
                <sl-icon slot="prefix" name="heart-fill"></sl-icon>
                Add to Favourites
                </sl-button>
            </div>
        </div>
    `
    render(dialogContent, dialogEl)
    //append to document.body
    await document.body.append(dialogEl)
    //show sl-dialog
    dialogEl.show()
    // on hide delete dialogEl
    dialogEl.addEventListener('sl-after-hide', ()=>{
        dialogEl.remove()
    })
  }

  async addFavHandler(){    //how to add favourites button
    try {
      await UserAPI.addFavHaircut(this.id)
      Toast.show('Haircut added to favourites')
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  render(){    
    return html`
    <style>
        .author{
            font-size: 0.9em;
            font-style: italic;
            opacity: 0.8;
        }
    </style>
    <sl-card>
        <img slot="image" src="${App.apiBase}/images/${this.image}" />
        <h2>${this.name}</h2>
        <h3>$${this.price}</h3>
        <p class="author">By ${this.user.firstName} ${this.user.lastName}</p>
        <sl-button @click=${this.moreInfoHandler.bind(this)}>More Info</sl-button>
        <sl-icon-button name="heart-fill" label="Add to Favourites" @click=${this.addFavHandler.bind(this)}></sl-icon-button>
    </sl-card>
    `
  }
  
})