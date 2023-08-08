create procedure [dbo].[DeleteDemo]
    @id int
as
begin
    begin try
        delete from milan where id = @id;
    end try
    begin catch
        throw;
    end catch
end