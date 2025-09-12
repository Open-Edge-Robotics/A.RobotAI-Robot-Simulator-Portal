import { useState } from "react";

import { Input, Textarea } from "innogrid-ui";

import Badge from "@/components/common/Badge";
import Container from "@/components/common/Container.tsx";
import Fieldset from "@/components/common/Fieldset";
import IconButton from "@/components/common/IconButton.tsx";
import Label from "@/components/common/Label";
import Title from "@/components/common/Title";

import type { TemplateFormData } from "@/types/template/domain";

interface BasicInformationProps {
  formData: TemplateFormData;
  onFormDataChange: <K extends keyof TemplateFormData>(field: K, value: TemplateFormData[K]) => void;
}

export default function BasicInformationSection({ formData, onFormDataChange }: BasicInformationProps) {
  return (
    <Container className="p-6">
      <Title title="기본 정보" fontSize="text-xl" fontWeight="font-medium" margin="mb-4" />
      <div className="space-y-4">
        <NameFieldset name={formData.name} onChange={(newName) => onFormDataChange("name", newName)} />
        <TypeFieldset type={formData.type} onChange={(newType) => onFormDataChange("type", newType)} />
        <DescriptionFieldset
          description={formData.description}
          onChange={(newDescription) => onFormDataChange("description", newDescription)}
        />
        <TopicsFieldset topics={formData.topics} onChange={(newTopics) => onFormDataChange("topics", newTopics)} />
      </div>
    </Container>
  );
}

function NameFieldset({ name, onChange }: { name: string; onChange: (newName: string) => void }) {
  return (
    <Fieldset>
      <Label label="템플릿 이름" htmlFor="template-name" required />
      <Input
        id="template-name"
        type="text"
        value={name}
        placeholder="템플릿 이름을 입력하세요"
        size={{ width: "100%", height: "40px" }}
        onChange={(e) => onChange(e.target.value)}
      />
    </Fieldset>
  );
}

function TypeFieldset({ type, onChange }: { type: string; onChange: (newType: string) => void }) {
  return (
    <Fieldset>
      <Label label="템플릿 타입" htmlFor="template-type" required />
      <Input
        id="template-type"
        type="text"
        value={type}
        placeholder="예: 자율주행차 기본, 드론 검사, 창고 로봇"
        size={{ width: "100%", height: "40px" }}
        onChange={(e) => onChange(e.target.value)}
      />
    </Fieldset>
  );
}

function DescriptionFieldset({
  description,
  onChange,
}: {
  description: string;
  onChange: (newDescription: string) => void;
}) {
  return (
    <Fieldset>
      <Label label="설명" htmlFor="template-description" required />
      <Textarea
        id="template-description"
        value={description}
        placeholder="템플릿 설명을 입력하세요"
        onChange={(e) => onChange(e.target.value)}
      />
    </Fieldset>
  );
}

function TopicsFieldset({ topics, onChange }: { topics: string[]; onChange: (newTopics: string[]) => void }) {
  const [topicInput, setTopicInput] = useState("");

  const handleAddTopicClick = () => {
    const newTopic = topicInput.trim();

    if (newTopic && !topics.includes(newTopic)) {
      onChange([...topics, newTopic]);
      setTopicInput("");
    }
  };

  const handleRemoveTopicClick = (topic: string) => {
    onChange(topics.filter((t) => t !== topic));
  };

  return (
    <Fieldset>
      <Label label="토픽 목록" htmlFor="topic-input" required />
      {/* innogrid-ui Input 컴포넌트의 가장 바깥 요소에는 class를 지정할 수 없으므로 대신 부모 div에서 지정  */}
      <div className="flex gap-2 [&>*:first-child]:flex-1">
        <Input
          id="topic-input"
          type="text"
          value={topicInput}
          placeholder="/camera/image_raw"
          size={{ width: "100%", height: "40px" }}
          onChange={(e) => setTopicInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTopicClick();
            }
          }}
        />
        <IconButton
          iconName="add"
          className="hover:bg-blue-primary-hover disabled:hover:bg-blue-primary bg-blue-primary h-10 w-10 rounded-md text-white active:bg-blue-600 disabled:cursor-default disabled:opacity-50"
          disabled={!topicInput.trim()}
          onClick={handleAddTopicClick}
        />
      </div>

      <p className="my-3 text-sm text-gray-500">토픽을 입력하고 + 버튼을 클릭하거나 Enter를 눌러 추가하세요.</p>

      {/* 토픽 목록 */}
      {topics.length > 0 ? (
        <Container className="p-4" bgColor="bg-blue-50" borderColor="border-blue-50">
          <p className="mb-3 text-sm font-medium text-gray-600">추가된 토픽 ({topics.length}개):</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <Badge bgColor="bg-blue-100" key={`${topic}_${index}`}>
                <span className="text-sm leading-3.5 text-blue-600">{topic}</span>
                <IconButton
                  iconName="close"
                  iconSize="16px"
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleRemoveTopicClick(topic)}
                />
              </Badge>
            ))}
          </div>
        </Container>
      ) : (
        <Container className="border-2 border-dashed p-4 text-sm text-gray-500" bgColor="bg-gray-25">
          아직 추가된 토픽이 없습니다.
        </Container>
      )}
    </Fieldset>
  );
}
