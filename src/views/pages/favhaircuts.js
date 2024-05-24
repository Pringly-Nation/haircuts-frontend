import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class FavHaircutsView { // favourite haircuts
  init(){
    document.title = 'Favourite Haircuts'    
    this.favHaircuts = null
    this.render()    
    Utils.pageIntroAnim()
    this.getFavHaircuts()
  }

  async getFavHaircuts(){ //importing the user's favourite haircuts , important for garage
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favHaircuts = currentUser.favouriteHaircuts
      console.log(this.favHaircuts)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){ // adding haircuts adding cars into garage
    const template = html`
      <va-app-header title="favourite Haircuts" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Favourite Haircuts</h1>
        <div class="haircuts-grid">
        ${this.favHaircuts == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.favHaircuts.map(haircut => html`
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
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new FavHaircutsView()