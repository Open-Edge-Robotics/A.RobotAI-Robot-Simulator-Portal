import { ENDPOINTS } from "@/constants/api";

import type { GetTemplatesResult } from "@/types/template/api";
import type { Template } from "@/types/template/domain";

import { apiClient } from ".";

export const templateAPI = {
  getTemplates: () => apiClient.getApi<GetTemplatesResult>(`${ENDPOINTS.template}`),
  getMockTemplates: () =>
    Promise.resolve({
      status: "success",
      message: "템플릿 정보를 성공적으로 조회했습니다.",
      data: { templates: mockTemplates },
    }),
};

const mockTemplates: Template[] = [
  {
    templateId: 1,
    name: "Robot Arm",
    type: "robot-arm",
    description: "This is robot-arm",
    db: "robot-arm_db.db3",
    meta: "robot-arm_meta.ros",
    topics: "/navi_motion_traj, /nav_vel, /scan_unified",
    createdAt: "2025-09-09 12:15:30",
  },
  {
    templateId: 2,
    name: "Autonomous Vehicle",
    type: "autonomous-vehicle",
    description: "Urban autonomous driving scenario with traffic navigation",
    db: "autonomous-vehicle_db.db3",
    meta: "autonomous-vehicle_meta.ros",
    topics: "/camera/image_raw, /lidar/points, /odom, /cmd_vel, /imu/data",
    createdAt: "2025-09-09 14:12:00",
  },
  {
    templateId: 3,
    name: "Drone Inspection",
    type: "drone-inspection",
    description: "Building exterior inspection using quadcopter drone",
    db: "drone-inspection_db.db3",
    meta: "drone-inspection_meta.ros",
    topics: "/camera/image, /imu/data, /gps/fix, /battery_status, /altitude",
    createdAt: "2025-09-09 09:30:00",
  },
  {
    templateId: 4,
    name: "Warehouse Robot",
    type: "warehouse-robot",
    description: "Automated warehouse logistics and inventory management robot",
    db: "warehouse-robot_db.db3",
    meta: "warehouse-robot_meta.ros",
    topics: "/scan, /map, /amcl_pose, /move_base/goal, /battery_state",
    createdAt: "2025-09-09 16:45:00",
  },
  {
    templateId: 5,
    name: "Marine Robot",
    type: "marine-robot",
    description: "Underwater exploration and monitoring robotic system",
    db: "marine-robot_db.db3",
    meta: "marine-robot_meta.ros",
    topics: "",
    createdAt: "2025-09-09 10:20:30",
  },
];
