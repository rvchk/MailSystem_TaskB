export default function StartupDepartments({ startup }) {

  const getBudget = (deptKey) => startup?.departments?.[deptKey] || 0;

  return (
    <div className="profile-section">
      <h2>Бюджет по отделам</h2>
      {/* {departments.map((dept) => (
        <div key={dept.key} className="department-item">
          <span className="dept-label">{dept.label}: </span>
          <span className="dept-amount">{getBudget(dept.value)} USD</span>
        </div>
      ))} */}
    </div>
  );
}
