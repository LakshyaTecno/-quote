import React from "react";
import photo1 from "../../../src/images/photo1.jpg"

const Card = () => {
  

  return (
    <>
      <section className="main-card--cointainer">
      <>
              <div className="card-container" key="abc">
                <div className="card ">
                  <div className="card-body">
                    <span className="card-number card-circle subtle">1</span>
                    <span className="card-author subtle"> Employee</span>
                    <h2 className="card-title"> Lakshya</h2>
                    <span className="card-description subtle">
                      laksljlsjsljl
                    </span>
                    <div className="card-read">9837089656</div>
                  </div>
                  <img src={photo1} alt="images" className="card-media" />

                  <span className="card-tag  subtle">Order Now</span>
                </div>
              </div>
            </>
      </section>
    </>
  );
};

export default Card;