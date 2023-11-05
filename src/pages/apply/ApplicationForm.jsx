import React, { useState } from 'react';

export default function ApplicationForm() {
    const [fields, setFields] = useState([
        { name: '', student_id: '', department: '', phone: '' },
    ]);

    const addField = () => {
        setFields([...fields, { name: '', student_id: '', department: '', phone: '' }]);
    };

    const deleteField = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const createApplication = () => {
        // 여기에서 만들기 버튼을 눌렀을 때의 동작을 구현합니다.
        // fields 배열을 이용하여 폼 데이터를 처리하고 신청서를 생성하는 로직을 추가합니다.
    };

    const clearFields = () => {
        setFields([{ name: '', student_id: '', department: '', phone: '' }]);
    };

    return (
        <div>
        {fields.map((field, index) => (
            <div key={index}>
            <input
                type="text"
                placeholder="이름"
                value={field.name}
                onChange={(e) => {
                    const newFields = [...fields];
                    newFields[index].name = e.target.value;
                    setFields(newFields);
                }}
            />
            <input
                type="text"
                placeholder="학번"
                value={field.student_id}
                onChange={(e) => {
                const newFields = [...fields];
                newFields[index].student_id = e.target.value;
                setFields(newFields);
                }}
            />
            <input
                type="text"
                placeholder="학과"
                value={field.department}
                onChange={(e) => {
                const newFields = [...fields];
                newFields[index].department = e.target.value;
                setFields(newFields);
                }}
            />
            <input
                type="text"
                placeholder="전화번호"
                value={field.phone}
                onChange={(e) => {
                const newFields = [...fields];
                newFields[index].phone = e.target.value;
                setFields(newFields);
                }}
            />
            {index > 0 && (
                <button onClick={() => deleteField(index)}>삭제</button>
            )}
            </div>
            ))}
            <button onClick={addField}>필드 추가</button>
            <button onClick={createApplication}>만들기</button>
            <button onClick={clearFields}>취소</button>
        </div>
    );
}
