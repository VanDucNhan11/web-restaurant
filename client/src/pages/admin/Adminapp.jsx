import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AccountManagement from './components/AccountManagement';
import PersonalInfo from './components/Profileadmin';
import EmployeeManagement from './components/EmployeeManagement';
import CategoryManagement from './components/CategoryManagement';
import TableManagement from './components/TableManagement';
import Reports from './components/Reports';
import Posts from './components/PostManagement';
import MenuManagement from './components/MenuManagement';
import './adminStyles.css';

const AdminApp = () => {
  return (
    <Router>
      <div className="admin-app">
        <nav className="admin-sidebar">
          <h2>Restaurant Admin</h2>
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/accounts">Quản lý tài khoản</Link></li>
            <li><Link to="/admin/personal-info">Thông tin cá nhân</Link></li>
            <li><Link to="/admin/employees">Nhân viên</Link></li>
            <li><Link to="/admin/categories">Danh mục</Link></li>
            <li><Link to="/admin/tables">Bàn ăn</Link></li>
            <li><Link to="/admin/reports">Báo cáo thống kê</Link></li>
            <li><Link to="/admin/posts">Bài viết</Link></li>
            <li><Link to="/admin/menu">Menu</Link></li>
          </ul>
        </nav>
        <div className="admin-content">
          <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route path="/admin/accounts" component={AccountManagement} />
            <Route path="/admin/personal-info" component={PersonalInfo} />
            <Route path="/admin/employees" component={EmployeeManagement} />
            <Route path="/admin/categories" component={CategoryManagement} />
            <Route path="/admin/tables" component={TableManagement} />
            <Route path="/admin/reports" component={Reports} />
            <Route path="/admin/posts" component={Posts} />
            <Route path="/admin/menu" component={MenuManagement} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default AdminApp;
