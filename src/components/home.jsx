import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {APIurl} from '../support/api_url';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, 
    Modal, ModalHeader, ModalBody, Button
  } from 'reactstrap';
import { connect } from 'react-redux';


function Home(props) {

    const [surat, setsurat]=useState({})
    // const [searchsurat, setsearchsurat]=useState({})
    const [loading, setloading]=useState(true)
    const [modal, setModal] = useState(false);
    const [indexDetail, setIndexdetail] = useState(0)
    
    const toggle = () => setModal(!modal);

    const openDetail = (index) =>{
        setIndexdetail(index)
        setModal(true)
    }

    useEffect(()=>{
        if(!props.Surat){
            Axios.get(`${APIurl}/surat`)
                .then((res)=>{
                    setsurat(res.data)
                    // setsearchsurat(res.data)
                    // console.log(props.Surat)
                }).catch((err)=>{
                    console.log(err)
                }).finally(()=>{
                    setloading(false)
                    // this.setState({loading:false})
                })
            }else{
                Axios.get(`${APIurl}/surat?type_like=${props.Surat}`)
                .then((res)=>{
                    setsurat(res.data)
                    // setsearchsurat(res.data)
                    // this.setState({
                        //     surat:res.data,
                        //     searchsurat:res.data
                        // })
                        // console.log(surat)
                    }).catch((err)=>{
                        console.log(err)
                    }).finally(()=>{
                        setloading(false)
                        // this.setState({loading:false})
                    })
                }
            },[props.Surat])
            
    

    const renderCard = () => {
        if(!loading){
            return surat.map((val,index)=>{
                return (
                    <div key={index} className="col-md-3 px-3 py-2">
                        <Card style={{backgroundColor:props.Dark? "black":"",borderColor:props.Dark? "white":""}}>
                            {/* <CardImg top width="100%" height="250" src={val.restaurant.featured_image} alt="Card image cap" /> */}
                                <CardBody>
                                    <div style={{textAlign:"left"}} className="mb-3">
                                        <CardTitle style={{color:props.Dark? "white":"", fontSize:"20px", fontWeight:"bolder"}}>{val.nama} ({val.asma})</CardTitle>
                                        <CardSubtitle style={{color:props.Dark? "white":"", fontSize:"20px"}}>{val.arti}</CardSubtitle>
                                    </div>
                                    <CardText>
                                        <audio controls style={{width:"100%", maxWidth:"250px"}}>
                                            <source src={val.audio} type="audio/mpeg" style={{width:"100%"}}/>
                                        </audio>
                                    </CardText>
                                    <Button className="rounded-pill py-3 detail" style={{width:"100px", height:"40px"}} onClick={()=>{openDetail(index)}}>
                                        <p style={{color:props.Dark? "white":"", fontSize:"17px", lineHeight:0}} className="detail">Detail</p>
                                    </Button>
                                </CardBody>
                        </Card>
                    </div>
                )
            })
        }
    }

    return(
        <div className="row px-5" style={{backgroundColor:props.Dark? "black":""}}>
            {
                surat.length?
                    <Modal isOpen={modal} toggle={toggle} className="">
                        <ModalHeader toggle={toggle}>{surat[indexDetail].nama} ({surat[indexDetail].asma})</ModalHeader>
                        <ModalBody style={{fontSize:"20px"}} toggle={toggle}>Keterangan :</ModalBody>
                        <ModalBody>
                            <div className="px-3">
                                <p dangerouslySetInnerHTML={{__html:surat[indexDetail].keterangan}} style={{textAlign:"justify"}}/>
                            </div>
                        </ModalBody>
                        <ModalBody toggle={toggle} style={{fontSize:"20px"}}>Jumlah Ayat :</ModalBody>
                        <ModalBody>
                            <div>
                                {surat[indexDetail].ayat}
                            </div>
                        </ModalBody>
                        <ModalBody toggle={toggle} style={{fontSize:"20px"}}>Lokasi Turun :</ModalBody>
                        <ModalBody>
                            <div>
                                {surat[indexDetail].type}
                            </div>
                        </ModalBody>
                        <ModalBody toggle={toggle} style={{fontSize:"20px"}}>Urutan Pewahyuan :</ModalBody>
                        <ModalBody>
                            <div>
                                {surat[indexDetail].urut}
                            </div>
                        </ModalBody>
                        {/* <ModalFooter>
                            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter> */}
                    </Modal>
                :
                null
            }
            {renderCard()}
        </div>
    )
}

const MapstatetoProps=(state)=>{
    return{
        Surat:state.Type.surat,
        Dark:state.Type.dark
    }
}

export default connect(MapstatetoProps) (Home)