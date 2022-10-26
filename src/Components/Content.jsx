import { Link } from 'react-router-dom'

const Content = ({loading,handleChannelName,data,visible,loadMore}) => {

    const channelList=[
        {
            name:"abc-news",
            logo:"https://yt3.ggpht.com/tpMEzbC7wY_FLcchd8sKDw0o4mEPNvoTOoFXvYGBZXFFyaZGzMjHx1-yrckUj-Yc_j-qcBLPYYg=w2120-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj"
        },
        {
            name:"al-jazeera-english",
            logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZv-eUG7YXJZW7qVYmSNcxbSH36--Dg_ZKGA&usqp=CAU"
        },
        {
            name:"bbc-news",
            logo:"https://thumbs.dreamstime.com/b/bbc-world-logo-news-bbc-world-news-bbc-s-international-news-current-affairs-television-channel-has-largest-138494765.jpg"
        },
        {
            name:"bloomberg",
            logo:"http://apkpuff.com/wp-content/uploads/2021/08/1-1.jpg"
        },
        {
            name:"business-insider",
            logo:"https://www.smartads.in/resources/assets/uploads/product_group/Digital/Businessinsider.jpg"
        },
        {
            name:"buzzfeed",
            logo:"https://images.newindianexpress.com/uploads/user/imagelibrary/2021/12/4/w900X450/1_WGgH5V1yI0-_qA_hIcwrDA.png?w=400&dpr=2.6"
        },
        {
            name:"cbc-news",
            logo:"https://www.cbc.ca/mediacentre/content/images/750x360_CBCNN_MediaCentre.jpg"
        },
        {
            name:"cnn",
            logo:"https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
        },
        {
            name:"fox-news",
            logo:"http://awakenedtograce.com/wp-content/uploads/2019/12/fox-news-logo.jpg"
        },
        {
            name:"google-news",
            logo:"https://www.appleidea.org/wp-content/uploads/2018/06/Google-News-una-ottima-alternativa-allapp-News-di-Apple-per-tenerci-sempre-aggiornati-sulle-notizie.png"
        },
        {
            name:"news24",
            logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5dHU8qB7j-CcswBuM5EW1wpqHRBmdp29uKiqM5-WUuj36x8Bmn1ipVfHT38t5P06RLWs&usqp=CAU"
        },
        {
            name:"reuters",
            logo:"https://variety.com/wp-content/uploads/2021/04/Reuters-paywall.png?w=640"
        },
        {
            name:"the-times-of-india",
            logo:"http://india.mom-gmr.org/uploads/tx_lfrogmom/media/16506-1592_import.png"
        },
        {
            name:"the-verge",
            logo:"https://i.ytimg.com/vi/YoV4HbMFAZI/maxresdefault.jpg"
        },
        {
            name:"the-washington-times",
            logo:"https://media.washtimes.com/media/image/2018/10/01/Red_on_White_1200x630.jpg"
        },
        {
            name:"time",
            logo:"https://hindi.theindianwire.com/wp-content/uploads/2022/05/time-magazine.jpg"
        }
    ]

// [abc-news,al-jazeera-english,bbc-news, bloomberg,business-insider, buzzfeed, cnn,fox-news,google-news,news24,reuters,the-times-of-india,the-verge,the-washington-times]


  return (
    <section>
        <div className="mx-auto shadow p-1 m-3 channel-list">
            <div className="scrollmenu ">
                { channelList.map((ch)=>
                <Link to="/channel" className='news-channel' onClick={()=>handleChannelName(`${ch.name}`)}>
                    <img src={`${ch.logo}`} alt="No Image" />
                </Link>
                )}
            </div>          
        </div>
        {!loading?
        <>
        {data?data.length==0?
            <div className="mx-auto shadow p-1 m-3 news-item">
                <img src="https://www.excess2sell.com/images/product-error2.png" className="card-img-top" alt="Image not available" />
            </div>
        :data.slice(0,visible).map((newsItem)=>
            <div className="mx-auto shadow p-1 m-3 news-item">
                <img src={newsItem.urlToImage} className="card-img-top" alt="Image not available"/>
                <div className="card-body text-light p-2">
                    <h5 className="card-title text-info">{newsItem.title}</h5><br/>
                    <p className="card-text">{newsItem.description}</p>
                    <span className="badge bg-dark rounded-0 me-2">{newsItem.source.name}</span>
                    <span className="badge bg-dark rounded-0 me-2">{new Date(newsItem.publishedAt.toString()).toDateString()}</span>
                    <a href={newsItem.url} target="_blank" className='badge bg-dark rounded-0 text-info'><i className="fa-solid fa-link"></i> Read More</a>
                </div>
            </div>
        )
        :<div className="mx-auto shadow p-1 m-3 news-item">
            <div className="card-body text-light p-2">
                <p className="card-text">Service temporarily unavailable! </p>
            </div>
        </div>
        }

        {
        (data && visible<=data.length)?
        <div className='container-fluid d-flex justify-content-center' >
            <button 
            className='btn btn-dark my-2 text-light rounded-0 border-secondary load-more'
            onClick={loadMore}>Load more news articles...</button>
        </div>
        :""
        }
        </>
        :<div className='container-fluid text-center text-light my-5' style={{width:"100%"}} disabled>
            Loading...
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </div>
    }
    </section>
  )
}

export default Content

