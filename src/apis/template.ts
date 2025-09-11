import { ENDPOINTS } from "@/constants/api";

import type { CreateTemplateRequest, CreateTemplateResult, GetTemplatesResult } from "@/types/template/api";
import type { Template } from "@/types/template/domain";

import { apiClient } from ".";

const ENDPOINT = ENDPOINTS.template;

export const templateAPI = {
  getTemplates: () => apiClient.getApi<GetTemplatesResult>(`${ENDPOINT}`),
  getMockTemplates: () =>
    Promise.resolve({
      status: "success",
      message: "템플릿 정보를 성공적으로 조회했습니다.",
      data: { templates: mockTemplates },
    }),

  createTemplate: (data: CreateTemplateRequest) => apiClient.postFormDataApi<CreateTemplateResult>(`${ENDPOINT}`, data),
};

const mockTemplates: Template[] = [
  {
    templateId: 1,
    name: "Robot Arm",
    type: "robot-arm",
    description: "This is robot-arm",
    bagFilePath: "robot-arm.bag",
    topics: "/navi_motion_traj, /nav_vel, /scan_unified",
    createdAt: "2025-09-09 12:15:30",
  },
  {
    templateId: 2,
    name: "Autonomous Vehicle",
    type: "autonomous-vehicle",
    description: "Urban autonomous driving scenario with traffic navigation",
    bagFilePath: "autonomous-vehicle.bag",
    topics: "/camera/image_raw, /lidar/points, /odom, /cmd_vel, /imu/data",
    createdAt: "2025-09-09 14:12:00",
  },
  {
    templateId: 3,
    name: "Drone Inspection",
    type: "drone-inspection",
    description: "Building exterior inspection using quadcopter drone",
    bagFilePath: "drone-inspection.bag",
    topics: "/camera/image, /imu/data, /gps/fix, /battery_status, /altitude",
    createdAt: "2025-09-09 09:30:00",
  },
  {
    templateId: 4,
    name: "Warehouse Robot",
    type: "warehouse-robot",
    description: "Automated warehouse logistics and inventory management robot",
    bagFilePath: "warehouse-robot.bag",
    topics: "/scan, /map, /amcl_pose, /move_base/goal, /battery_state",
    createdAt: "2025-09-09 16:45:00",
  },
  {
    templateId: 5,
    name: "Marine Robot",
    type: "marine-robot",
    description: "Underwater exploration and monitoring robotic system",
    bagFilePath: "marine-robot.bag",
    topics: "",
    createdAt: "2025-09-09 10:20:30",
  },
];
