import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import HaircutAPI from './../../HaircutAPI'

class HaircutsView {
  init(){
    document.title = 'haircuts'
    this.haircuts = null   
    this.render()    
    Utils.pageIntroAnim()
    this.getHaircuts()
  }

  async getHaircuts(){
    try{
      this.haircuts = await HaircutAPI.getHaircuts()
      console.log(this.haircuts)
      this.render()
    }catch{
      Toast.show(err, 'error')
    }
  }
  render(){ //how to render images and text for the haircuts
    const template = html`
      <va-app-header title="Haircuts" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <div class="haircuts-grid">
        ${this.haircuts == null ? html`
          <sl-spinner></sl-spinner>
          `:html`
          ${this.haircuts.map(haircut => html`

          <va-haircut class="haircut-card"
          id="${haircut._id}"
          name="${haircut.name}"
          description="${haircut.description}"
          price="${haircut.price}"
          user="${JSON.stringify(haircut.user)}"
          image="${haircut.image}"
          gender="${haircut.gender}"
          length="${haircut.length}"
        >
        </va-haircut>

          `)}
        `}
        </div>      
    `
    render(template, App.rootEl)
  }
}


export default new HaircutsView()