import React from 'react';
import { render } from 'react-dom';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import ATSAT from './ATSAT.jpg'
import './profile.css'

function Profile(){
    
    return(
        <>
        
        <img className='PPic'src={ATSAT}/>

        <p className='UserName'>USER NAME</p>
        <div className='UserCosas'>
            <p className='correo'>USER EMAIL</p>

            <p className='role'>USER ROLE</p>

            <p className='FavAuth'>USER FAV AUTHOR</p>
        </div>

        

        <div className='Favbooks'>
            <p className='Librous'>
                <p className='Favoritos'>Favorite books</p>
                <br></br>
            <Element className="element" id="scroll-container" style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            marginBottom: '100px'
          }}>

            <Element style={{
              marginBottom: '20px'
            }}>
              book info 1
          </Element>

            <Element  style={{
              marginBottom: '20px'
            }}>
              book info 2
          </Element>

          <Element style={{
              marginBottom: '20px'
            }}>
              book info 3
          </Element>

          <Element style={{
              marginBottom: '20px'
            }}>
              book info 4
          </Element>
          </Element>
            </p>
        </div>

        <div className='Favbooks'>
        <p className='Favoritos'>Read books</p>
                <br></br>
          <Element className="element" id="scroll-container" style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            marginBottom: '100px'
          }}>

            <Element name="scroll-container-first-element" style={{
              marginBottom: '20px'
            }}>
              book info
          </Element>

            <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              book info
          </Element>
          </Element>
        </div>

        <div className='Favbooks'>
        <p className='Favoritos'>Bookish friends</p>
                <br></br>
          <Element className="element" id="scroll-container" style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            marginBottom: '100px'
          }}>

            <Element name="scroll-container-first-element" style={{
              marginBottom: '20px'
            }}>
              This is the longest name a person can have
          </Element>

            <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              Friend2
          </Element>
          </Element>

          
        </div>

        <div className='Favbooks'>
        <p className='Favoritos'>Rated books</p>
                <br></br>
          <Element className="element" id="scroll-container" style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            marginBottom: '100px'
          }}>

            <Element name="scroll-container-first-element" style={{
              marginBottom: '20px'
            }}>
              Book1
          </Element>

            <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              Book 2
          </Element>
          </Element>

          
        </div>

        <div className='Favbooks'>
        <p className='Favoritos'>Currently reading</p>
                <br></br>
          <Element className="element" id="scroll-container" style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            marginBottom: '100px'
          }}>

            <Element name="scroll-container-first-element" style={{
              marginBottom: '20px'
            }}>
              Friend1
          </Element>

            <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              Friend2
          </Element>
          </Element>

          
        </div>

        <div className='Favbooks'>
        <p className='Favoritos'>TBR</p>
                <br></br>
          <Element className="element" id="scroll-container" style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            marginBottom: '100px'
          }}>

            <Element name="scroll-container-first-element" style={{
              marginBottom: '20px'
            }}>
              Friend1
          </Element>

            <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              Friend2
          </Element>
          </Element>

          
        </div>
        </>
    )
}

export default Profile