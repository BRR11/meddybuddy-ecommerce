import React from 'react'
import "../shipping/shippingaddress.scss"
import { Fragment, useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Country, State } from "country-state-city";
import { save_Shipping_Info } from '../../redux/apicalls';
import Navbar from '../../component/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';


function Shippingaddress() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo,cartproducts} = useSelector((state) => state.cart);
  
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [pinCode, setPinCode] = useState();
  const [phoneNo, setPhoneNo] = useState();

  const shippingSubmit = (e) => {
    e.preventDefault();

    
    
    save_Shipping_Info(dispatch,{ address, city, state, country, pinCode, phoneNo });
    navigate("/confirmorder");
    
  };

  
  return (
    <div className='shippingaddresspage'>
        <Navbar/>
        <div className='shippingdiv'>
        <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Confirm Your Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
        </div>
       
    </div>
  )
}

export default  Shippingaddress;