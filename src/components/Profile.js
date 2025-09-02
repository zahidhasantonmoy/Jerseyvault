import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Profile.css';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const { user } = supabase.auth.getSession();

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  const updateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { user } = supabase.auth.getSession();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
      setMessage('Profile updated!');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Your Profile</h2>
      <form onSubmit={updateProfile} className="profile-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={supabase.auth.getSession()?.user?.email} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar_url">Avatar URL</label>
          <input
            id="avatar_url"
            type="url"
            value={avatar_url || ''}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>

        <button className="profile-button" disabled={loading}>
          {loading ? 'Loading...' : 'Update Profile'}
        </button>
      </form>
      <p className="profile-message">{message}</p>
    </div>
  );
};

export default Profile;
