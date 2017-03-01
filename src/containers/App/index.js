import './style.less';
import 'whatwg-fetch';
import {h, Component} from 'preact';

export default class App extends Component {

  state = {
    status: null,
    reason: null,
    phoneNumber: null,
    loading: true
  }

  componentWillMount() {
    fetch('http://landing.mutlu.mobi/index?r=697&landing=kivilcim-29')
      .then(response => {
        if (response.url === 'http://landing.mutlu.mobi/Landing/NoService?text=WebStart%20Not%20Allowed') {
          this.setState({
            status: 'FAIL',
            reason: 'NO_MOBILE',
            loading: false
          });
        }
        return response.text();
      })
      .then(htmlString => {
        if (!this.state.loading) return;

        const regexpSearch = htmlString.match(/\d{10}/g);
        if (regexpSearch && regexpSearch.length === 2) {
          this.setState({
            status: 'SUCCESS',
            phoneNumber: regexpSearch[1],
            loading: false
          });
        } else {
          this.setState({
            status: 'FAIL',
            reason: 'NOT_FOUND',
            loading: false
          });
        }
      })
  }
  render({}, { loading, status, reason, phoneNumber }) {

    return (
      <div>
        <div className="header">
          <h2>GSM leak test</h2>
        </div>
        <div className="content">
          <div className="resultContainer">
          {do {
            if (loading) {
              <div>
                <h2>Test yapılıyor...</h2>
              </div>
            }
            else if(status === 'SUCCESS') {
              (
                <div>
                  <h2>Telefon numaranız</h2>
                  <h1>0{phoneNumber}</h1>
                  <p>Telefon numaranızın dileyen site tarafından ele geçilmesine karşıysanız lütfen GSM operatörünüz ile iletişime geçip bu durumu dile getirin.</p>
                  <p className="shareText">Bu sayfayı paylaşarak daha fazla kişinin bu konu hakkında bilgi sahibi olmasını sağlayabilirsiniz.</p>
                </div>
              )
            } else if (status === 'FAIL' && reason === 'NO_MOBILE') {
              <div>
                <h2>Test başarısız!</h2>
                <p>Telefon numaranızın 3. parti internet siteleri ile paylaşılma durumunu test edebilmek için lütfen bu sayfayı <strong>mobil cihazınızdan wi-fi kullanmadan</strong> ziyaret edin.</p>
              </div>
            } else {
              <div>
               <h2>Numaranız güvende gibi duruyor!</h2>
               <p>GSM operatörünüz numaranızı paylaşmıyor veya şuan kullandığımız teknik ile numaranıza erişemiyoruz.</p>
              </div>
            }
          }}
        </div>
        </div>
      </div>
    )
  }
}
