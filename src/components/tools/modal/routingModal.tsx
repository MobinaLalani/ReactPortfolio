import React from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as GoogleMapIcon } from '../../icons/svg/googleMapIcon.svg';
import { ReactComponent as BaladIcon } from '../../icons/svg/baladIcon.svg';
import { ReactComponent as WazeIcon } from '../../icons/svg/wazeIcon.svg';
import { ReactComponent as NeshanIcon } from '../../icons/svg/neshanIcon.svg';

type RoutingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  latitude: string;  // مقصد
  longitude: string; // مقصد
};

const RoutingModal: React.FC<RoutingModalProps> = ({ isOpen, onClose, latitude, longitude }) => {
  if (!isOpen) return null;

  const openRouting = async (app: 'google' | 'balad' | 'waze' | 'neshan') => {
    if (!navigator.geolocation) {
      alert('موقعیت مکانی در دسترس نیست');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const originLat = position.coords.latitude;
        const originLng = position.coords.longitude;

        let url = '';

        switch (app) {
          case 'google':
            url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${latitude},${longitude}`;
            break;
          case 'balad':
            url = `https://balad.ir/route?origin=${originLat},${originLng}&destination=${latitude},${longitude}`;
            break;
          case 'waze':
            url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
            break;
          case 'neshan':
            url = `https://neshan.org/route?destination=${latitude},${longitude}&origin=${originLat},${originLng}`;
            break;
        }

        window.open(url, '_blank');
      },
      (err) => {
        console.error(err);
        alert('اجازه دسترسی به موقعیت مکانی داده نشد.');
      }
    );
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-[16px] p-6 w-full max-w-md shadow-lg relative mb-[1%]">
        <span className="block w-full text-center font-semibold mb-4">مسیر یابی در</span>

        <div className="flex justify-between items-center gap-4 mt-8">
          <button onClick={() => openRouting('google')} className="w-14 h-14 flex items-center justify-center rounded-xl hover:bg-gray-100 transition">
            <GoogleMapIcon  className='w-15 h-15'/>
          </button>
          <button onClick={() => openRouting('balad')} className="w-14 h-14 flex items-center justify-center rounded-xl hover:bg-gray-100 transition">
            <BaladIcon />
          </button>
          <button onClick={() => openRouting('waze')} className="w-14 h-14 flex items-center justify-center rounded-xl hover:bg-gray-100 transition">
            <WazeIcon />
          </button>
          <button onClick={() => openRouting('neshan')} className="w-14 h-14 flex items-center justify-center rounded-xl hover:bg-gray-100 transition">
            <NeshanIcon />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RoutingModal;
