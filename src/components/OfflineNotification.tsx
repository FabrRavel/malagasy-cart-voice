
import { useEffect, useState } from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const OfflineNotification = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Fonction pour gérer le changement d'état de la connexion
    const handleOnlineStatusChange = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (online) {
        toast({
          title: "Connexion rétablie",
          description: "Vous êtes maintenant connecté à Internet.",
          duration: 3000,
        });
      } else {
        toast({
          title: "Mode hors ligne",
          description: "Vous utilisez l'application sans connexion Internet.",
          duration: 5000,
        });
      }
    };

    // Ajouter les écouteurs d'événements
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    // Nettoyer les écouteurs d'événements
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-amber-100 text-amber-800 rounded-lg shadow-lg flex items-center">
      <WifiOff className="h-5 w-5 mr-2" />
      <span>Mode hors ligne</span>
    </div>
  );
};

export default OfflineNotification;
