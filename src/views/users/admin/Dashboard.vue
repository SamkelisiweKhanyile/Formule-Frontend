<template>
  <div class="dashboard">
    <!-- Welcome Banner -->
    <div class="welcome-banner">
      <h1>Welcome, admin!</h1>
      <p>Here's what's happening with your store today.</p>
    </div>

    <!-- Metrics Cards -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-header">Total Products</div>
        <div class="metric-value">{{ metrics.totalProducts }}</div>
        <div class="metric-icon">
          <i class="fa fa-cube"></i>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-header">Total Orders</div>
        <div class="metric-value">{{ metrics.totalOrders }}</div>
        <div class="metric-icon">
          <i class="fa fa-shopping-cart"></i>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-header">Total Customers</div>
        <div class="metric-value">{{ metrics.totalCustomers }}</div>
        <div class="metric-icon">
          <i class="fa fa-users"></i>
        </div>
      </div>
    </div>

    <!-- Recommendations Section -->
    <div class="recommendations-section">
      <h2>Recommendations</h2>
      <div class="recommendations-grid">
        <!-- Low Stock Alert -->
        <div class="recommendation-card alert">
          <div class="icon">
            <i class="fa fa-exclamation-circle"></i>
          </div>
          <div class="content">
            <h3>Low Stock Alert</h3>
            <p>15 products are running low on inventory. Consider restocking soon.</p>
          </div>
        </div>

        <!-- Pending Orders -->
        <div class="recommendation-card pending">
          <div class="icon">
            <i class="fa fa-clock"></i>
          </div>
          <div class="content">
            <h3>Pending Orders</h3>
            <p>23 orders are awaiting processing. Review and update their status.</p>
          </div>
        </div>

        <!-- Top Performing Category -->
        <div class="recommendation-card success">
          <div class="icon">
            <i class="fa fa-chart-line"></i>
          </div>
          <div class="content">
            <h3>Top Performing Category</h3>
            <p>Fresh Produce sales increased by 34% this month.</p>
          </div>
        </div>

        <!-- Customer Feedback REMOVED as requested -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Mock metrics data
const metrics = ref({
  totalProducts: 1247,
  totalOrders: 892,
  totalCustomers: 3456
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background-color: #f9faf9;
  min-height: 100vh;
}

/* Welcome Banner */
.welcome-banner {
  background: #2d4a2b;
  color: white;
  padding: 24px 32px;
  border-radius: 12px;
  margin-bottom: 24px;
}
.welcome-banner h1 {
  font-size: 24px;
  margin: 0 0 8px 0;
}
.welcome-banner p {
  font-size: 14px;
  opacity: 0.9;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.metric-card {
  background: #c7e96f;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.metric-header {
  font-size: 14px;
  color: #2d4a2b;
  font-weight: 600;
  margin-bottom: 8px;
}
.metric-value {
  font-size: 28px;
  font-weight: bold;
  color: #2d4a2b;
}
.metric-icon {
  width: 50px;
  height: 50px;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #2d4a2b;
}

/* Recommendations Section */
.recommendations-section {
  margin-bottom: 40px;
}
.recommendations-section h2 {
  font-size: 18px;
  color: #2d4a2b;
  margin-bottom: 16px;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.recommendation-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid transparent;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.recommendation-card .icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
}
.recommendation-card .content h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #2d4a2b;
}
.recommendation-card .content p {
  margin: 0;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

/* Card Types */
.recommendation-card.alert {
  border-left-color: #ffc107;
}
.recommendation-card.alert .icon {
  background: #ffc107;
}

.recommendation-card.pending {
  border-left-color: #0d6efd;
}
.recommendation-card.pending .icon {
  background: #0d6efd;
}

.recommendation-card.success {
  border-left-color: #198754;
}
.recommendation-card.success .icon {
  background: #198754;
}

/* Icons (using Font Awesome) */
.fa {
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
}

/* Responsive */
@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  .recommendations-grid {
    grid-template-columns: 1fr;
  }
  .metric-card {
    padding: 16px;
  }
  .metric-value {
    font-size: 24px;
  }
  .recommendation-card {
    padding: 16px;
    gap: 10px;
  }
  .recommendation-card .icon {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}
</style>