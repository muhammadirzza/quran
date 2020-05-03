import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { connect } from 'react-redux';
import {isType,isClear,isMode,isSearch} from '../redux/actions';
import {useHistory} from 'react-router-dom';
import { FaRegMoon,FaRegSun } from "react-icons/fa";


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsdark] = useState(false)
  const [onsearch, setonsearch] = useState("")

  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory()

  const onMekah = () => {
    props.isType("mekah")
    // console.log(props.Surat)
  }

  const onMadinah = () => {
    props.isType("madinah")
    // console.log(props.Surat)
  }

  const allSurat = () => {
    props.isClear()
    // console.log(props.Input)
    // console.log(onsearch)
  }

  const onMode = () => {
      setIsdark(!isDark)
      props.isMode(!isDark)
  }

  const onSubmitSearch = (e) =>{
    e.preventDefault()
    history.push(`/search/${onsearch}`)
    props.isSearch(true)
    // console.log(props.Input)
    setonsearch("")
  }
  
  // if(props.Input){
    // return <Link to={`/search/${props.Input}`} />
  // }

  return (
    <div>
      <Navbar color={props.Dark? "dark":"light"}  light expand="md" className="px-5">
        <NavbarBrand onClick={allSurat} style={{color:props.Dark? "white":"black"}} className="tes" >Qur'an</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem onClick={onMekah} className="tes">
              <NavLink style={{color:props.Dark? "white":"black"}}>Makkiyah</NavLink>
            </NavItem>
            <NavItem onClick={onMadinah} className="tes" >
              <NavLink style={{color:props.Dark? "white":"black"}}>Madaniyah</NavLink>
            </NavItem>
            <NavItem onClick={onMode} className="tes">
                {
                    props.Dark?
                    <NavLink style={{color:props.Dark? "white":"black"}}><FaRegSun /> Light</NavLink>
                    :
                    <NavLink style={{color:props.Dark? "white":"black"}}><FaRegMoon /> Dark</NavLink>
                }
                
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>
            <form className="form-inline my-2 my-lg-0" onSubmit={onSubmitSearch}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={onsearch} onChange={(e)=>{setonsearch(e.target.value)}}/>
                {/* <Link to={props.Input?`/search/${onsearch}`:""}> */}
                  <button className={props.Dark?"btn btn-outline-light my-2 my-sm-0":"btn btn-outline-dark my-2 my-sm-0"} type="submit">Search</button>
                {/* </Link> */}
            </form>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

const MapstatetoProps=(state)=>{
    return{
        Surat:state.Type.surat,
        Dark:state.Type.dark,
        Input:state.Type.inputsearch
    }
  }

export default connect(MapstatetoProps,{isType,isClear,isMode,isSearch}) (Header);