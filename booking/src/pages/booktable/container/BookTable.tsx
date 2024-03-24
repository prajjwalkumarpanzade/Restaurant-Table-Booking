import './BookTable.css';

const BookTable = () => {
 return (
    <div className="signup-container">
        <div>
            <h1>Book Table</h1>
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            name="Name"
                            placeholder="Name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="tel"
                            name="contactno"
                            placeholder="contact number"
                            minLength={6}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            name="number"
                            placeholder="Number of Persons"
                            min={1}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Choose Date </label><br></br><br></br>
                        <input
                            type="date"
                            name="date"
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>
                    <button type="submit">Book</button>
                </form>
        </div>
    </div>
 )
}

export default BookTable;