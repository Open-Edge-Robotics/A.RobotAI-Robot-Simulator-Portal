import { ENDPOINTS } from "@/constants/api";

import type {
  CreateTemplateRequest,
  GetTemplateResponse,
  CreateTemplateResponse,
  GetTemplatesResponse,
  UpdateTemplateRequest,
  UpdateTemplateResponse,
} from "@/types/template/api";
import type { Template } from "@/types/template/domain";

import { apiClient } from ".";

const ENDPOINT = ENDPOINTS.template;

export const templateAPI = {
  getTemplates: () => apiClient.getApi<GetTemplatesResponse>(`${ENDPOINT}`),
  getMockTemplates: () =>
    Promise.resolve({
      status: "success",
      message: "템플릿 정보를 성공적으로 조회했습니다.",
      data: mockTemplates,
    }),

  getTemplate: (id: number) => apiClient.getApi<GetTemplateResponse>(`${ENDPOINT}/${id}`),
  getMockTemplate: (id: number) =>
    Promise.resolve({
      status: "success",
      message: "템플릿 정보를 성공적으로 조회했습니다.",
      data: { template: mockTemplates[0] },
    }),

  createTemplate: (data: CreateTemplateRequest) =>
    apiClient.postFormDataApi<CreateTemplateResponse>(`${ENDPOINT}`, data),

  updateTemplate: (id: number, data: UpdateTemplateRequest) =>
    apiClient.patchFormDataApi<UpdateTemplateResponse>(`${ENDPOINT}/${id}`, data),

  updateMockTemplate: (id: number, data: UpdateTemplateRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
      // 2초 후에 성공
      setTimeout(() => {
        console.log(`Template ${id} updated successfully`);
        resolve();
      }, 2000);
    });
  },

  deleteTemplate: (id: number) => apiClient.deleteApi(`${ENDPOINT}/${id}`),

  deleteMockTemplate: (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      // 2초 후에 성공
      setTimeout(() => {
        console.log(`Template ${id} deleted successfully`);
        resolve();
      }, 2000);
    });
  },
};

const mockTemplates: Template[] = [
  {
    templateId: 1,
    templateName: "Robot Arm",
    templateType: "robot-arm",
    templateDescription: "This is robot-arm",
    metadataFile: {
      fileName: "robot-arm.yaml",
      downloadUrl: "https://example.com/robot-arm.yaml",
    },
    dbFile: {
      fileName: "robot-arm.db3",
      downloadUrl: "https://example.com/robot-arm.db3",
    },
    topics: "/navi_motion_traj,/nav_vel,/scan_unified",
    createdAt: "2025-09-09 12:15:30",
  },
  {
    templateId: 2,
    templateName: "Autonomous Vehicle",
    templateType: "autonomous-vehicle",
    templateDescription: "Urban autonomous driving scenario with traffic navigation",
    dbFile: {
      fileName: "autonomous-vehicle.db3",
      downloadUrl: "https://example.com/autonomous-vehicle.db3",
    },
    metadataFile: {
      fileName: "autonomous-vehicle.yaml",
      downloadUrl: "https://example.com/autonomous-vehicle.yaml",
    },
    topics: "/camera/image_raw,/lidar/points,/odom,/cmd_vel,/imu/data",
    createdAt: "2025-09-09 14:12:00",
  },
  {
    templateId: 3,
    templateName: "Drone Inspection",
    templateType: "drone-inspection",
    templateDescription: "Building exterior inspection using quadcopter drone",
    dbFile: {
      fileName: "drone-inspection.db3",
      downloadUrl: "https://example.com/drone-inspection.db3",
    },
    metadataFile: {
      fileName: "drone-inspection.yaml",
      downloadUrl: "https://example.com/drone-inspection.yaml",
    },
    topics: "/camera/image,/imu/data,/gps/fix,/battery_status,/altitude",
    createdAt: "2025-09-09 09:30:00",
  },
  {
    templateId: 4,
    templateName: "Warehouse Robot",
    templateType: "warehouse-robot",
    templateDescription: "Automated warehouse logistics and inventory management robot",
    dbFile: {
      fileName: "warehouse-robot.db3",
      downloadUrl: "https://example.com/warehouse-robot.db3",
    },
    metadataFile: {
      fileName: "warehouse-robot.yaml",
      downloadUrl: "https://example.com/warehouse-robot.yaml",
    },
    topics: "/scan,/map,/amcl_pose,/move_base/goal,/battery_state",
    createdAt: "2025-09-09 16:45:00",
  },
];
