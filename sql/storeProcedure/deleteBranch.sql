CREATE PROCEDURE logicdelete
  @branch_id INT
AS
  UPDATE branch SET Active = 0 WHERE BranchId = @branch_id;
  SELECT 'success';
GO