import React from 'react';
import canastaRed from './canastaRed.jpg';
import basketball from './basketball.jpg';
import basketRed2 from './basketRed2.jpg';

const Home = () => (

    // <div>
        // <div>
        //     <a className='btn--primary' href="/teams/all">TEAMS</a>
        //     <a className='btn--secundary' href="/seasons/all">SEASONS</a>
        // </div>
    // </div>
    

        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img class="d-block w-100 h-100" src={basketRed2} alt="First slide"/>
                <a href="/teams/all" class="btn-neon">
                    <span id="span1"></span>
                    <span id="span2"></span>
                    <span id="span3"></span>
                    <span id="span4"></span>
                    Teams
                </a>
            </div>
            <div class="carousel-item">
            <img class="d-block w-100" src={canastaRed} alt="Second slide"/>
                <a href="/seasons/all" class="btn-neon">
                    <span id="span1"></span>
                    <span id="span2"></span>
                    <span id="span3"></span>
                    <span id="span4"></span>
                    Seasons
                </a>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>
);

export default Home;
