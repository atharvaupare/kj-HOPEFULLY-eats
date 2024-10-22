/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle2, ChefHat, Truck, XCircle } from 'lucide-react';

export default function Toast({ message, status, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getStatusIcon = () => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <AlertCircle className="text-yellow-500" />;
      case 'cooking':
        return <ChefHat className="text-orange-500" />;
      case 'ready':
        return <CheckCircle2 className="text-green-500" />;
      case 'delivered':
        return <Truck className="text-blue-500" />;
      case 'canceled':
        return <XCircle className="text-red-500" />;
      default:
        return <AlertCircle className="text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'border-yellow-500 bg-yellow-50';
      case 'cooking':
        return 'border-orange-500 bg-orange-50';
      case 'ready':
        return 'border-green-500 bg-green-50';
      case 'delivered':
        return 'border-blue-500 bg-blue-50';
      case 'canceled':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 max-w-md p-4 border-l-4 rounded-lg shadow-lg ${getStatusColor()} transition-all duration-500 ease-in-out transform translate-y-0`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <p className="font-medium text-gray-800">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};