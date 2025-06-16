import React from 'react';
import { useGetUsersWithPromptsQuery } from '../stores/Slices/adminApiSlice';

const AdminUsersWithPrompts = () => {
  const { data: users, error, isLoading } = useGetUsersWithPromptsQuery();

  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>שגיאה בטעינת הנתונים</p>;

  return (
    <div>
      <h2>רשימת משתמשים והיסטוריית פניות</h2>
      {users?.map(user => (
        <div key={user.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
          <h3>{user.firstName} {user.lastName} ({user.email})</h3>
          <ul>
            {user.prompts.length === 0 && <li>אין פניות</li>}
            {user.prompts.map(prompt => (
              <li key={prompt.id}>
                {prompt.title} - {new Date(prompt.created_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminUsersWithPrompts;
