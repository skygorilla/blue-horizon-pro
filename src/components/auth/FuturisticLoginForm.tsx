import React, { useState } from 'react';
import styles from './FuturisticLoginForm.module.css';

interface FuturisticLoginFormProps {
  onSubmit?: (email: string, password: string) => Promise<void>;
  loading?: boolean;
}

const FuturisticLoginForm: React.FC<FuturisticLoginFormProps> = ({
  onSubmit,
  loading = false
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(email, password);
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.formWrapper}>
        {/* Animated rim light container */}
        <div className={styles.rimLight}></div>
        
        {/* Main form container */}
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>System Login</h2>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Username</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Enter username"
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={styles.loginButton}
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
            
            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FuturisticLoginForm;