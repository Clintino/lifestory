import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, X } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import Button from '../components/ui/Button';

const steps = [
  { id: 1, label: 'Choose Relationship' },
  { id: 2, label: 'Create Profile' },
  { id: 3, label: 'Select Questions' },
  { id: 4, label: 'Tell Story' },
  { id: 5, label: 'Preview' },
];

const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    birthYear: '',
    description: '',
  });
  const [images, setImages] = useState<{ url: string; file: File }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && images.length < 2) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImages(prev => [...prev, { url, file }]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].url);
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data and images in localStorage
    localStorage.setItem('profileData', JSON.stringify({
      ...formData,
      images: images.map(img => img.url)
    }));
    navigate('/question-selection');
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <ProgressIndicator steps={steps} currentStep={2} />

        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-center mb-2">
            Create Profile
          </h1>
          <p className="text-neutral-600 text-center mb-8">
            Tell us about the person whose story you're preserving.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Margaret Johnson"
                required
              />
            </div>

            <div>
              <label htmlFor="birthYear" className="block text-sm font-medium text-neutral-700 mb-1">
                Birth Year (optional)
              </label>
              <input
                type="number"
                id="birthYear"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., 1945"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                Short Description (optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Beloved grandmother of 3, master gardener"
                rows={3}
              />
            </div>

            <div>
              <p className="block text-sm font-medium text-neutral-700 mb-2">
                Upload Photos (optional)
              </p>
              <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative w-24 h-24 border border-neutral-200 rounded-md overflow-hidden"
                  >
                    <img 
                      src={image.url} 
                      alt={`Uploaded image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm"
                    >
                      <X size={14} className="text-neutral-600" />
                    </button>
                  </div>
                ))}
                
                {images.length < 2 && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 border-2 border-dashed border-neutral-300 rounded-md flex flex-col items-center justify-center text-neutral-500 hover:text-indigo-500 hover:border-indigo-500 transition-colors"
                    >
                      <UploadCloud size={20} />
                      <span className="text-xs mt-1">Upload</span>
                    </button>
                  </>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Upload up to 2 photos for the profile. Drag and drop or click to upload.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={!formData.name}
              >
                Next: Select Questions
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default CreateProfilePage;