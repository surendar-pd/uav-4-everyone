---
title: Uncrewed Aerial Vehicles (UAVs)
nextjs:
  metadata:
    title: Uncrewed Aerial Vehicles (UAVs) Dataset
    description: A dataset supporting autonomous UAV interception using deep reinforcement learning and fuzzy logic algorithms with realistic simulation-to-hardware pipeline.
---

This dataset supports autonomous UAV interception using a deep reinforcement learning and fuzzy logic algorithm. Integration with MATLAB, ROS1, and PX4 enables a realistic simulation-to-hardware pipeline.

---

## Overview

This dataset supports autonomous UAV interception using a deep reinforcement learning and fuzzy logic algorithm. Integration with MATLAB, ROS1, and PX4 enables a realistic simulation-to-hardware pipeline. A programmable quadrotor was built and tested in dynamic real-world scenarios.

### System Architecture

```python
# UAV interception system configuration
uav_system_config = {
    "target_uav": "DJI Mini 4 Pro",
    "ownship": "Self-built programmable quadrotor",
    "environment": "Netted outdoor space with safety boundaries",
    "software_stack": ["MATLAB", "ROS1", "PX4", "Track Anything"],
    "sensors": ["GPS", "radar"],
    "annotation": "Flight log analysis, waypoint planning via DJI app"
}
```

---

## Sample & Results Showcase

### Simulation Results

**Gazebo simulation of 2V2 interception**

![Gazebo Simulation View](https://via.placeholder.com/600x400/1e293b/ffffff?text=Gazebo+2V2+Interception)

### Performance Metrics

**Relative 3D distances and Euclidean plots for Ownship 1**

![Coordinate Error O1-I1](https://via.placeholder.com/300x200/1e293b/ffffff?text=Coord+Error+O1-I1) ![Euclidean Distance O1-I1](https://via.placeholder.com/300x200/1e293b/ffffff?text=Euclidean+O1-I1)

**Relative 3D distances and Euclidean plots for Ownship 2**

![Coordinate Error O2-I2](https://via.placeholder.com/300x200/1e293b/ffffff?text=Coord+Error+O2-I2) ![Euclidean Distance O2-I2](https://via.placeholder.com/300x200/1e293b/ffffff?text=Euclidean+O2-I2)

### Real-World Experiment

**Real-world experiment setup and interception sequence**

![Experiment Setup](https://via.placeholder.com/300x200/1e293b/ffffff?text=Setup) ![Interception Process](https://via.placeholder.com/300x200/1e293b/ffffff?text=Process)

**Relative distance drop during interception**

![Final Distances](https://via.placeholder.com/400x300/1e293b/ffffff?text=Final+Distances)

### Demo Video

[ROS + Gazebo simulation demo video](#) - Complete interception sequence demonstration

---

## Experiment Description

### Target and Ownship Configuration

**Target**: DJI Mini 4 Pro acting as intruder UAV

**Ownship**: Self-built programmable quadrotor

**Environment**: Netted outdoor space with safety boundaries

**Software Stack**: MATLAB, ROS1, PX4, Track Anything

**Sensors**: GPS, radar for post-flight velocity/position validation

**Annotation**: Flight log analysis, waypoint planning via DJI app

### Hardware Setup

```python
# Hardware configuration
hardware_setup = {
    "target_drone": {
        "model": "DJI Mini 4 Pro",
        "role": "Intruder UAV",
        "control": "DJI app waypoint planning"
    },
    "ownship_drone": {
        "type": "Self-built programmable quadrotor",
        "role": "Interceptor",
        "control": "ROS1 + PX4 autopilot"
    },
    "environment": {
        "type": "Netted outdoor space",
        "safety": "Boundary constraints",
        "testing_area": "Controlled environment"
    }
}
```

### Software Integration

```python
# ROS1 node for UAV interception
import rospy
from geometry_msgs.msg import Twist
from sensor_msgs.msg import NavSatFix

class UAVInterceptor:
    def __init__(self):
        rospy.init_node('uav_interceptor')

        # Publishers and subscribers
        self.cmd_vel_pub = rospy.Publisher('/cmd_vel', Twist, queue_size=1)
        self.gps_sub = rospy.Subscriber('/gps/fix', NavSatFix, self.gps_callback)

        # Deep RL agent
        self.rl_agent = DeepRLAgent()

        # Fuzzy logic controller
        self.fuzzy_controller = FuzzyController()

    def interception_loop(self):
        """Main interception control loop"""
        rate = rospy.Rate(10)  # 10 Hz

        while not rospy.is_shutdown():
            # Get current state
            current_state = self.get_current_state()

            # RL decision making
            action = self.rl_agent.get_action(current_state)

            # Fuzzy logic refinement
            refined_action = self.fuzzy_controller.refine_action(action, current_state)

            # Execute control command
            self.execute_control(refined_action)

            rate.sleep()
```

---

## Code Implementation

ROS and MATLAB code snippets are included in the ZIP file to simulate, control, and evaluate interception strategies. Sample code visualizations and documentation are available for reference.

### Deep Reinforcement Learning Implementation

```python
# Deep RL agent for UAV interception
import torch
import torch.nn as nn
import numpy as np

class DeepRLAgent(nn.Module):
    def __init__(self, state_dim, action_dim, hidden_dim=128):
        super(DeepRLAgent, self).__init__()

        self.network = nn.Sequential(
            nn.Linear(state_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, action_dim)
        )

    def forward(self, state):
        return self.network(state)

    def get_action(self, state):
        """Get action using epsilon-greedy policy"""
        with torch.no_grad():
            q_values = self.forward(state)
            action = torch.argmax(q_values, dim=-1)
        return action.numpy()

# Training loop
def train_interception_agent(agent, environment, episodes=1000):
    """Train the RL agent for UAV interception"""
    optimizer = torch.optim.Adam(agent.parameters(), lr=0.001)

    for episode in range(episodes):
        state = environment.reset()
        total_reward = 0

        while not environment.done:
            # Get action from agent
            action = agent.get_action(state)

            # Execute action in environment
            next_state, reward, done = environment.step(action)

            # Store experience and train
            agent.store_experience(state, action, reward, next_state, done)

            if len(agent.memory) > 32:
                agent.train_step(optimizer)

            state = next_state
            total_reward += reward

        if episode % 100 == 0:
            print(f"Episode {episode}, Total Reward: {total_reward}")
```

### Fuzzy Logic Controller

```python
# Fuzzy logic controller for action refinement
import numpy as np
from skfuzzy import control as ctrl

class FuzzyController:
    def __init__(self):
        # Define fuzzy variables
        self.distance = ctrl.Antecedent(np.arange(0, 100, 1), 'distance')
        self.velocity = ctrl.Antecedent(np.arange(0, 50, 1), 'velocity')
        self.angle = ctrl.Antecedent(np.arange(-180, 180, 1), 'angle')

        self.thrust = ctrl.Consequent(np.arange(0, 100, 1), 'thrust')
        self.yaw_rate = ctrl.Consequent(np.arange(-90, 90, 1), 'yaw_rate')

        # Define membership functions
        self.setup_membership_functions()

        # Create control rules
        self.setup_rules()

        # Create control system
        self.control_system = ctrl.ControlSystem(self.rules)
        self.controller = ctrl.ControlSystemSimulation(self.control_system)

    def refine_action(self, rl_action, state):
        """Refine RL action using fuzzy logic"""
        # Extract state information
        distance = state['distance_to_target']
        velocity = state['relative_velocity']
        angle = state['relative_angle']

        # Set fuzzy inputs
        self.controller.input['distance'] = distance
        self.controller.input['velocity'] = velocity
        self.controller.input['angle'] = angle

        # Compute fuzzy output
        self.controller.compute()

        # Get refined action
        refined_thrust = self.controller.output['thrust']
        refined_yaw = self.controller.output['yaw_rate']

        return {
            'thrust': refined_thrust,
            'yaw_rate': refined_yaw,
            'base_action': rl_action
        }
```

---

## Version History

| Date | Version | Details                                                                                          |
| ---- | ------- | ------------------------------------------------------------------------------------------------ |
| 2025 | v1.0    | Initial release with complete hardware setup, real-world flight, and ROS-based interception demo |

### Future Releases

- **v1.1** (Planned): Multi-UAV coordination algorithms
- **v2.0** (Planned): Advanced obstacle avoidance and path planning

---

## Contact & Support

**Lead Maintainer**: Bingze / Mohammad

**Email**: [miodrag.bolic@uottawa.ca](mailto:miodrag.bolic@uottawa.ca)

**Affiliation**: University of Ottawa

**Response Time**: Typically replies within 72 hours

### Getting Help

For questions about UAV interception algorithms, ROS integration, or hardware setup, please reach out to our research team. We're committed to supporting researchers working on autonomous UAV systems.

{% callout title="Research Impact" %}
This dataset provides the first comprehensive framework for autonomous UAV interception using deep reinforcement learning and fuzzy logic, enabling research into advanced aerial defense systems and autonomous navigation.
{% /callout %}
