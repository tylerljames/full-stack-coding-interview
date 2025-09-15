import linkIcon from '@/assets/links.svg';
import logo from '@/assets/logo.svg';
import { useAuth } from '@/context/AuthContext';
import { photosAPI } from '@/services/api';
import type { Photo } from '@/types';
import { useEffect, useState } from 'react';
import LikeButton from './LikeButton';

const PhotosPage: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const resp = await photosAPI.getPhotos();
        setPhotos(resp.data);
      } catch (e) {
        setError('Failed to load photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handleLike = async (photoId: number) => {
    try {
      await photosAPI.likePhoto(photoId);
      const resp = await photosAPI.getPhotos();
      setPhotos(resp.data);
    } catch (e) {
      console.error(`Failed to like photo: ${e}`);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  return (
    <div className="min-h-screen ">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src={logo}
                alt="Photo App Company Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 mr-3 sm:mr-4"
              />
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">
                All photos
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-gray-600 text-sm sm:text-base hidden sm:inline">
                Welcome, {user?.email}
              </span>
              <button
                onClick={logout}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base hover:cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="space-y-3 sm:space-y-4">
          {photos.map((photo) => (
            <div key={photo.id} className=" p-3 sm:p-4 ">
              <div className="flex items-start space-x-3 sm:space-y-4">
                <LikeButton
                  isLiked={photo.is_liked}
                  onToggle={() => handleLike(photo.id)}
                />

                <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                  <img
                    src={photo.src_medium}
                    alt={photo.alt}
                    className="w-full h-full object-cover rounded hover:cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base leading-tight">
                    {photo.photographer}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">
                    {photo.alt}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs sm:text-sm text-gray-500">
                      #{photo.pexels_id}
                    </span>
                    <span
                      className="inline-block w-3 h-3 "
                      style={{ backgroundColor: photo.avg_color }}
                      title={`Color: ${photo.avg_color}`}
                    ></span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 py-2 ">
                  <img
                    src={linkIcon}
                    alt="Pexels portfolio link"
                    className="w-3 h-3"
                  />
                  <a
                    href={photo.photographer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                  >
                    <span className="text-xs">Portfolio</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={selectedPhoto.src_large}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-red-500  bg-white bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center hover:bg-opacity-75 hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className=""
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PhotosPage;
