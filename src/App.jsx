import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import FindEmail from '@/pages/FindEmail'
import FindPassword from '@/pages/FindPassword'
import VerifyCode from '@/pages/VerifyCode'
import DesignSystem from '@/pages/DesignSystem'
import Main from '@/pages/Main'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find-email" element={<FindEmail />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
